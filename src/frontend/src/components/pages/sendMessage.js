import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import axios from "axios";
import Select from "react-select";


class sendMessage extends Component
{
    constructor()
    {
        super();
        this.state =
            {
                selectedPatient: null,
                patient_list: [],
                message: "",
                errors: {},
                successMessage: "",
                errorMessage: ""
            };
    }

    componentDidMount()
    {
        axios
            .get('/patient/fetch')
            .then(
                (res) =>
                {
                    let patient_list = [];

                    res.data.patients.forEach(
                        (patient) =>
                        {
                            patient_list.push(
                                {
                                    value: patient,
                                    label: patient.patient_details.name
                                });
                        });

                    this.setState({patient_list: patient_list});
                })
            .catch(
                (err) =>
                {
                    this.setState({errors: {error: err.message}});
                });
    }

    clearFields = isSuccess =>
    {
        if(isSuccess)
            this.setState({ selectedPatient: null, message: "", errorMessage: "" })
        else
            this.setState({ successMessage: "" })
    }

    onChange = e =>
    {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e =>
    {
        e.preventDefault();

        axios
            .put('/message/create', {patient_id: this.state.selectedPatient.value.patient_details.id,
                message: this.state.message})
            .then(
                (res) =>
                {
                    if(res.status == 200)
                    {
                        this.setState({successMessage: res.data.message});
                        this.clearFields(true);
                    }
                    else
                    {
                        this.setState({errorMessage: res.data.message})
                        this.clearFields(false);
                    }
                })
            .catch(
                (err) =>
                {
                    this.setState({errorMessage: err.message});
                    this.clearFields(false);
                });
    }

    render()
    {
        const { user } = this.props.auth;
        const { selectedPatient } = this.state;
        const { errors } = this.state;
        const selectStyles = { menu: styles => ({ ...styles, zIndex: 999 }) };

        return (
            <div style={{ height: "75vh" }} className="container valign-wrapper">
                <div className="row">
                    <div className="col s12 center-align">
                        <h4>
                            <b>Hey </b> {user.name.split(" ")[0]}
                        </h4>
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <h4>
                                <b>Send a message</b> to a loved one.
                            </h4>
                        </div>
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <h5>
                                <b style={{ color: "green" }}>{this.state.successMessage}</b>
                            </h5>
                        </div>
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <h5>
                                <b style={{ color: "red" }}>{this.state.errorMessage}</b>
                            </h5>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="input-field col s12">
                                <Select
                                    styles={selectStyles}
                                    value={selectedPatient}
                                    onChange={selectedPatient => this.setState({ selectedPatient })}
                                    options={this.state.patient_list}
                                    placeholder="Select Patient"
                                />
                            </div>
                            <div className="input-field col s12">
                                <textarea
                                    onChange={this.onChange}
                                    value={this.state.message}
                                    id="message"
                                    type="text"
                                    data-length="500"
                                    className={classnames("materialize-textarea ", {invalid: errors.message})}
                                />
                                <label htmlFor="message">Message</label>
                                <span className="red-text">{errors.message}</span>
                            </div>
                            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                                <button
                                    style={{
                                        width: "150px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "1rem"
                                    }}
                                    type="submit"
                                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                >
                                    Send
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}


sendMessage.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({auth: state.auth});

export default connect(mapStateToProps)(sendMessage);
