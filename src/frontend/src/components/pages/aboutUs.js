import React, { Component } from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

class aboutUs extends Component
{
    constructor()
    {
        super();
        this.state =
            {
                name: "",
                errors: {}
            };
    }

    render()
    {
        const { user } = this.props.auth;

        return (
            <div style={{ height: "75vh" }} className="container valign-wrapper">
                <div className="row">
                    <div className="col s12 center-align">
                        <h4>
                            <b>Hey there,</b> {user.name.split(" ")[0]}
                        </h4>
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <h4>
                                We're just a bunch of people wanting to <b>make a difference</b>
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

aboutUs.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({auth: state.auth});

export default connect(mapStateToProps)(aboutUs);
