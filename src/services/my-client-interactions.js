import data from "../data/userstats";
import api from "./core";
import Axios from "axios";

export const getClientInteractions = (id, source) => {
    const keys = Object.keys(source);
    const key = keys.find(key => key.includes(id));
   
    const dataObject = source[key];
    const unacceptableContactsIds = dataObject.totalUnacceptableContacts.map(con => con.sid);
    console.log(unacceptableContactsIds);
    if (dataObject && dataObject.totalNumberOfContacts && dataObject.totalNumberOfContacts.length > 0) {
        return dataObject.totalNumberOfContacts.map(co => {
          const { sid, name } = co;
           return {
             id: sid,
             name,
             platform: 'WeChat', // hardcoded for now
             region: 'APAC', // hardcoded for now
             isAcceptable: unacceptableContactsIds.indexOf(sid) === -1
           }
        }); 
    } 
};

export const getTeam = () => {

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
