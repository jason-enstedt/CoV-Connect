import React, { Component } from "react";
import { Route, HashRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";


import Sidebar from "../layout/Sidebar";
import sendMessage from "../pages/sendMessage";
import addPatient from "../pages/addPatient";
import aboutUs from "../pages/aboutUs";
import dashboardButtons from "../pages/dashboardButtons";


class Dashboard extends Component
{
    constructor()
    {
        super();
        this.state =
            {
                name: "",
                email: "",
                errors: {}
            };
    }

    render()
    {
        const items = [
            { destination: "/sendMessage", label: "Send Message" },
            { destination: "/addPatient", label: "Add Patient" },
            { destination: "/aboutUs", label: "About Us" }
        ];

        return (
            <HashRouter>
            <div>
                <div>
                    <Sidebar items={items} left/>
                </div>
                <div style={{ height: "75vh" }} className="container valign-wrapper">
                    <div className="row">
                        <Route exact path="/" component={dashboardButtons}/>
                        <Route path="/sendMessage" component={sendMessage}/>
                        <Route path="/addPatient" component={addPatient}/>
                        <Route path="/aboutUs" component={aboutUs}/>
                    </div>
                </div>
            </div>
            </HashRouter>
        );
    }
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({auth: state.auth});

export default connect(mapStateToProps)(Dashboard);
