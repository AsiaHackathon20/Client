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

class Tables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       conversations: [] 
    }
  }

  componentDidMount() {
    
       const conversations = getMyClientInteractions()

       if (conversations) {
         this.setState({
          conversations
         })
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
                  <CardTitle tag="h4">List of my client interactons</CardTitle>
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
                        this.state.conversations.map(con => {
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
          </Row>
        </div>
      </>
    );
  }
}

export default Tables;
