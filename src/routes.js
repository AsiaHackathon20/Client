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
import Dashboard from "views/Dashboard.js";
import Tables2 from "views/MyDashBoard.js";
import TeamDashBoard from "views/TeamDashBoard.js"
import Rtl from "views/Rtl.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import UserProfile from "views/UserProfile.js";

var routes = [
  {
    path: "/dashboard",
    name: "Compliance Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Tables2,
    layout: "/admin"
  },
  {
    path: "/team-dashboard",
    name: "Team Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: TeamDashBoard,
    layout: "/admin"
  },
  {
    path: "/reports",
    name: "Reports",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-puzzle-10",
    component: Dashboard,
    layout: "/admin"
  },
  
];
export default routes;
