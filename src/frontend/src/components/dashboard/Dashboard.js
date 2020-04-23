import React, { Component } from "react";
import { Route, HashRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Sidebar from "../layout/Sidebar";
import sendMessage from "../pages/sendMessage";
import addPatient from "../pages/addPatient";
import aboutUs from "../pages/aboutUs";
import DashboardHome from "../pages/DashboardHome";
import SentMessages from "../pages/sentMessages";

function Dashboard() {
  const items = [
    { destination: "/sendMessage", label: "Send Message" },
    { destination: "/addPatient", label: "Add Patient" },
    { destination: "/aboutUs", label: "About Us" },
    { destination: "/sentMessages", label: "Sent Messages"},
  ];

  return (
    <HashRouter>
      <div style={{ paddingTop: 32 }}>
        <div>
          <Sidebar items={items} left/>
        </div>
        <div className="container valign-wrapper">
          <div className="row">
            <Route exact path="/" component={DashboardHome}/>
            <Route path="/sendMessage" component={sendMessage}/>
            <Route path="/addPatient" component={addPatient}/>
            <Route path="/aboutUs" component={aboutUs}/>
            <Route path="/sentMessages" component={SentMessages} />
          </div>
        </div>
      </div>
    </HashRouter>
  );
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({auth: state.auth});

export default connect(mapStateToProps)(Dashboard);
