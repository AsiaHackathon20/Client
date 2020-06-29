import data from "../data/userstats";
import api from "./core";
import Axios from "axios";

export const getClientInteractions = (id) => {

    const dataObject = id ? data.team.find(member => member.sid === id) : data;
    if (dataObject && dataObject.clientInteractions && dataObject.clientInteractions.length > 0) {
        return dataObject.clientInteractions.map(co => {
          const { clientIdentifier, clientName, platform, region, isAcceptable } = co;
           return {
             id: clientIdentifier,
             name: clientName,
             platform,
             region,
             isAcceptable
           }
        }); 
    } 
};

export const getTeam = () => {

    Axios.get('/api/getWeChatActivitySnapshot/').then(result => {
        console.log(result);
    }).catch(error => {
        console.log(error);
    });
    fetch('/api/getWeChatActivitySnapshot/', {
        mode: 'no-cors',
        accept: '*'
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(ex => {
        console.log(ex);
    });
    if (data && data.team && data.team.length > 0) {
        return data.team.map(co => {
          const  {sid, name, role, region, platform , clientInteractions  } = co;
           return {
            sid,
            name,
            role,
            region,
            platform,
            conversationsLength:  clientInteractions.length,
            unAcceptableConversations: clientInteractions.filter(con => con.isAcceptable).length
           }
        });
    }
}
