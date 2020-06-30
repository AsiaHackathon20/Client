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
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createStore } from 'redux'
import AdminLayout from "layouts/Admin/Admin.js";
import RTLLayout from "layouts/RTL/RTL.js";
import { loadSnapshot, initialState} from './snapshot-reducer'
import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import { Provider } from 'react-redux'
import Axios from "axios";

const hist = createBrowserHistory();
const store = createStore(loadSnapshot, initialState)
const Root = ({ store }) => {
    useEffect(() =>{
      Axios.get('/api/getWeChatActivitySnapshot/').then(response => {
         store.dispatch({type: 'LOAD', data: response.data});
      });   
    });
    return (
    <Provider store={store}>
      <Router history={hist}>
        <Switch>
          <Route path="/admin" render={props => <AdminLayout {...props} />} />
          <Route path="/rtl" render={props => <RTLLayout {...props} />} />
          <Redirect from="/" to="/admin/dashboard" />
        </Switch>
      </Router>
    </Provider>
  )
}

ReactDOM.render(
  <Root store= {store} />,
  document.getElementById("root")
);


