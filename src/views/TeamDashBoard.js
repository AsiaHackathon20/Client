/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import data from "../data/userstats"

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col
} from "reactstrap";

class TeamDashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       conversations: [],
       teamMemberSelected: false,
       teamMemberConversations: []
    };
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    if (data && data.team && data.team.length > 0) {
       const conversations =  data.team.map(co => {
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

       this.setState({
        conversations
       })
    }
  }

  onClick(e) {
    if (data && data.team && data.team.length > 0) {
      
      const teamMember = data.team.find(member => member.sid === e);
      if( teamMember && teamMember.clientInteractions && teamMember.clientInteractions.length > 0) {
        
        const teamMemberConversations = teamMember.clientInteractions.map(co => {
          const { clientIdentifier, clientName, platform, region, isAcceptable } = co;
           return {
             id: clientIdentifier,
             name: clientName,
             platform,
             region,
             isAcceptable
           };
        });

        this.setState({
          teamMemberSelected: true,
          teamMemberConversations
        });
  
      }
    }
    
  }
  render() {
    return (
      <>
        <div className="content">
          <Row>
          <Col md="12">
              <Card >
                <CardHeader>
                  <CardTitle tag="h4">Team Details</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>sid</th>
                        <th>Name</th>
                        <th>Platform</th>
                        <th>Region</th>
                        <th>Total Conversations</th>
                        <th>Unacceptable Conversations</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.state.conversations.map(con => {
                          return (
                            <tr>
                            <td><a href="#" onClick={() => this.onClick(con.sid)}>{con.sid}</a> </td>
                            <td>{con.name}</td>
                            <td>{con.platform}</td>
                            <td>{con.region}</td>
                            <td>{con.conversationsLength}</td>
                            <td className="text-center">{con.unAcceptableConversations}</td>
                          </tr>
                        )
                        })
                      }
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
            { !this.state.teamMemberSelected  ? null :
            (<Col md="12">
              <Card >
                <CardHeader>
                  <CardTitle tag="h4">External interactons</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Client Id</th>
                        <th>Name</th>
                        <th>Platform</th>
                        <th>Region</th>
                        <th className="text-center">Un Aceptable Conversations</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.state.teamMemberConversations.map(con => {
                          return (
                            <tr>
                            <td>{con.id}</td>
                            <td>{con.name}</td>
                            <td>{con.platform}</td>
                            <td>{con.region}</td>
                            <td className="text-center">{con.isAcceptable ? "Acceptable" : "Not Acceptable"}</td>
                          </tr>
                        )
                        })
                      }
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
            )
            }
          </Row>
        </div>
      </>
    );
  }
}

export default TeamDashBoard;
