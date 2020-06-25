import data from "../data/userstats";


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
