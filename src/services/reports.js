import data from "../data/userstats";

const colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
'#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
'#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
'#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
'#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
'#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
'#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
'#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
'#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
'#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];


export const policy_break_interactions_by_region = convas => {

    var eurCount =0, apacCount =0, naCount = 0;
    if (data.region === 'EUR') eurCount++;
    else if (data.region === 'NA') naCount++;
    else apacCount++;

    data.team.forEach(member => {
        if (member.clientInteractions.some(ci => !ci.isAcceptable)) {
            switch (member.region) {
                case 'EUR':
                    eurCount++; 
                    break;
                
                case 'NA':
                    naCount++; 
                    break;
                
                default:
                    apacCount++;
                    break;
            } 
        }
    });

    return {
        labels: ['EUR', 'APAC', 'NA'],
        datasets: [{
                data: [eurCount, apacCount, naCount],
                backgroundColor: colorArray,
                hoverBackgroundColor: colorArray
            }
        ]
    }
}

export const policy_break_by_user = data => {

    const { ASIA_CREDIT_SALES } = data;

    console.error('ASIA_CREDIT_SALES', ASIA_CREDIT_SALES);
    const labels = Object.keys(ASIA_CREDIT_SALES).map(t => ASIA_CREDIT_SALES[t].userDetails.id);
    
   
    var teamViolations  = Object.keys(ASIA_CREDIT_SALES).map(key => {
            return ASIA_CREDIT_SALES[key].totalUnacceptableContacts.length
    });

    return {
        labels,
        datasets: [{
                label: 'Policy Violations',
                data: [...teamViolations],
                backgroundColor: colorArray,
                hoverBackgroundColor: colorArray
            }
        ]
    }
}

export const total_conversations_by_sid = convas => {

    const labels = [ 'R316615', 'F664451', 'F241770', 'W520587'];
    
    var leadVilotions = data.clientInteractions.length;
    var teamViolations  = data.team.map(member => {
            return member.clientInteractions.length
    });

    return {
        labels,
        datasets: [{
                data: [leadVilotions, ...teamViolations],
                backgroundColor: colorArray,
                hoverBackgroundColor: colorArray
            }
        ]
    }
}