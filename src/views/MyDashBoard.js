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
import { getMyClientInteractions } from "services/my-client-interactions";
import { mapStateToProps } from "./TeamDashBoard";
import { connect } from "react-redux";
import { getClientInteractions } from "services/my-client-interactions";

class ComplianceDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       chatGroups: [],
       groupSelected: false,
       userSelected: false,
       users: [],
       unAcceptableContacts: [],
       selectedUser: '',
       groupName: ''
    };

    this.onGroupSelect = this.onGroupSelect.bind(this);
    this.onUserSelect = this.onUserSelect.bind(this);
  }

  componentDidMount() {
    if (this.props.data) {
       const chatGroups = Object.keys(this.props.data).map(key => {
         const groupContacts = Object.keys(this.props.data[key]).map(userKey => {
          this.props.data[key][userKey].totalUnacceptableContacts.map(contact => contact.smpIdentifier)
        })
  
        const unAcceptableContacts = [].concat.apply([], groupContacts);

         return {
           name: key,
           region: 'APAC',
           platform: 'weChat',
           unAcceptableContacts: unAcceptableContacts.length
         }
       });

      this.setState({
        chatGroups: chatGroups
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.data && prevProps.data !== this.props.data ) {
       const chatGroups = Object.keys(this.props.data).map(key => {
         const groupContacts = Object.keys(this.props.data[key]).map(userKey => {
          this.props.data[key][userKey].totalUnacceptableContacts.map(contact => contact.smpIdentifier)
        })
  
        const unAcceptableContacts = [].concat.apply([], groupContacts);

         return {
           name: key,
           region: 'APAC',
           platform: 'weChat',
           unAcceptableContacts: unAcceptableContacts.length
         }
       });

      this.setState({
        chatGroups: chatGroups
      })
    }
  }

  onGroupSelect(name) {

    const users = [];
    
    Object.keys(this.props.data[name]).forEach(key => {
        users.push({
            sid: this.props.data[name][key].userDetails.id,
            name: this.props.data[name][key].userDetails.name,
            platform: 'WeChat', // hardcoded for now as server does not return it
            region: 'APAC', // hardcoded for now as server does not return it
            totalContacts: this.props.data[name][key].totalNumberOfContacts,
            totalUnacceptableContacts: this.props.data[name][key].totalUnacceptableContacts
        });
    });

    console.log(users);
    this.setState({
      users,
      groupSelected: true,
      userSelected: false,
      groupName: name
    });
  }

  onUserSelect(sid) {
    if (sid) {
        const teamMemberContacts = getClientInteractions(sid, this.props.data[this.state.groupName]);
        const keys = Object.keys(this.props.data[this.state.groupName]);
        const key = keys.find(key => key.includes(sid));
        const name = this.props.data[this.state.groupName][key].userDetails.name;
        if (teamMemberContacts) {
          this.setState({
            teamMemberSelected: true,
            selectedUser: `${name} ( ${sid} )`,
            unAcceptableContacts: teamMemberContacts,
            userSelected: true
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
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Chat groups </CardTitle>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Group Name</th>
                        <th>Platform</th>
                        <th>Region</th>
                        <th className="text-center">Unacceptable Contacts</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.state.chatGroups.map(con => {
                          return (
                            <tr>
                            <td><a href="#" onClick={() => this.onGroupSelect(con.name)}>{con.name}</a> </td>
                            <td>{con.platform}</td>
                            <td>{con.region}</td>
                            <td className="text-center">{con.unAcceptableContacts}</td>
                          </tr>
                        )
                        })
                      }
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          { 
            !this.state.groupSelected ? null :
            <>
            (
              <Col md="12">
                <Card >
                  <CardHeader>
            <CardTitle tag="h4">{`Chat members - ${this.state.groupName}`}</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Table className="tablesorter">
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
                            this.state.users.map(con => {
                            return (
                              <tr>
                              <td><a href="#" onClick={() => this.onUserSelect(con.sid, con.name)}>{con.sid}</a> </td>
                              <td>{con.name}</td>
                              <td>{con.platform}</td>
                              <td>{con.region}</td>
                              <td>{con.totalContacts.length}</td>
                              <td className="text-end">{con.totalUnacceptableContacts.length}</td>
                            </tr>
                          )
                          })
                        }
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
              {
                !this.state.userSelected ? null :
              (<Col md="12">
                <Card >
                  <CardHeader>
                    <CardTitle tag="h4">{`External clients for ${this.state.selectedUser}`}</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Table className="tablesorter">
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
                          this.state.unAcceptableContacts.map(con => {
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
              </Col>)
              }
            )
            </>
            
          }
          
          </Row>
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps)(ComplianceDashboard);
