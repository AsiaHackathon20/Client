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
import { getTeam } from "services/my-client-interactions";
import { getClientInteractions } from "services/my-client-interactions";
import { connect } from "react-redux";

class TeamDashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       conversations: [],
       teamMemberSelected: false,
       teamMemberConversations: [],
       selectedUser: '',
       serverState: null
    };
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    const conversations = getTeam();
    if( conversations) {
       this.setState({
        conversations
       })
    }
  }

  onClick(sid, name) {
    const { ASIA_RATES_SALES } = this.props.data;
    if (sid) {
        const teamMemberContacts = getClientInteractions(sid, ASIA_RATES_SALES);
          
        if (teamMemberContacts) {
          this.setState({
            teamMemberSelected: true,
            selectedUser: `${name} ( ${sid} )`,
            teamMemberConversations: teamMemberContacts
          });
        }
  
    }
  }

  render() {
    const { ASIA_RATES_SALES } = this.props.data;
    if(!ASIA_RATES_SALES) {
       return null; 
    }
    const users = [];
    
    Object.keys(ASIA_RATES_SALES).forEach(key => {
        users.push({
            sid: ASIA_RATES_SALES[key].userDetails.id,
            name: ASIA_RATES_SALES[key].userDetails.name,
            platform: 'WeChat', // hardcoded for now as server does not return it
            region: 'APAC', // hardcoded for now as server does not return it
            totalContacts: ASIA_RATES_SALES[key].totalNumberOfContacts,
            totalUnacceptableContacts: ASIA_RATES_SALES[key].totalUnacceptableContacts
        });
    });
    console.log(users);
    
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
                        <th>Total Contacts</th>
                        <th>Policy Breaks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                          users.map(con => {
                          return (
                            <tr>
                            <td><a href="#" onClick={() => this.onClick(con.sid, con.name)}>{con.sid}</a> </td>
                            <td>{con.name}</td>
                            <td>{con.platform}</td>
                            <td>{con.region}</td>
                            <td>{con.totalContacts.length}</td>
                            <td className="text-center">{con.totalUnacceptableContacts.length}</td>
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
                  <CardTitle tag="h4">{`External interactons for ${this.state.selectedUser}`}</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Client Id</th>
                        <th>Name</th>
                        <th>Platform</th>
                        <th>Region</th>
                        <th className="text-center">Policy Break</th>
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
                            <td className="text-center">{con.isAcceptable ? "NO" : "YES"}</td>
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

export const mapStateToProps = (state) => {
    console.log(state)
  return {
    data: state
  }
}

export default connect(mapStateToProps)(TeamDashBoard);
