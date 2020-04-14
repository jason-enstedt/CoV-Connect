import React, { Component } from "react";
import { Link } from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/authActions";


class Navbar extends Component
{
    onLogoutClick = e =>
    {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        return (
            <div className="navbar-fixed">
                <nav className="z-depth-0">
                    <div className="nav-wrapper white">
                        <Link
                            to="/"
                            style={{
                                fontFamily: "monospace"
                            }}
                            className="col s5 brand-logo center blue-text"
                        >
                            <i className="material-icons green-text">favorite</i>
                            Cov-Connect
                        </Link>
                        {
                            this.props.auth.isAuthenticated ?
                            <button
                                style={{
                                    width: "150px",
                                    borderRadius: "4px",
                                    letterSpacing: "1.5px",
                                    marginTop: "14px",
                                    marginRight: "10px"
                                }}
                                onClick={this.onLogoutClick}
                                className="btn btn-medium waves-effect waves-light hoverable blue accent-3 right"
                            >
                                Logout
                            </button> :
                            null
                        }
                    </div>
                </nav>
            </div>
        );
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({auth: state.auth});

export default connect(mapStateToProps, { logoutUser })(Navbar);
