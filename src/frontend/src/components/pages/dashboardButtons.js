import React, { Component } from "react";
import {Link} from "react-router-dom";


class dashboardButtons extends Component
{
    render()
    {
        return (
            <div className="col s12 center-align">
                <table>
                    <td>
                        <Link
                            style={{
                                width: "250px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "1rem"
                            }}
                            to="/sendMessage"
                            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                        >
                            Send Message
                        </Link>
                    </td>
                    <td>
                        <Link button
                              style={{
                                  width: "250px",
                                  borderRadius: "3px",
                                  letterSpacing: "1.5px",
                                  marginTop: "1rem"
                              }}
                              to="/addPatient"
                              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                        >
                            Add Patient
                        </Link>
                    </td>
                </table>
            </div>
        );
    }
}

export default dashboardButtons;