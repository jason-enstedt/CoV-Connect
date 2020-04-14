import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Select from 'react-select';
import axios from 'axios';


class addPatient extends Component
{
    constructor()
    {
        super();
        this.state =
            {
                patient_name: "",
                dob_date: "",
                dob_month: "",
                dob_year: "",
                hospital_list: [],
                selectedHospital: null,
                errors: {},
                successMessage: "",
                errorMessage: "",
                focused: false,
                isSearchable: true
            };
    }

    componentDidMount()
    {
        axios
            .get('/hospital/fetch')
            .then(
                (res) =>
                {
                    let hospital_list = [];

                    res.data.hospitals.forEach(
                        (hospital) =>
                        {
                            hospital_list.push({value: hospital.id, label: hospital.name + " - " + hospital.address});
                        });

                    this.setState({hospital_list: hospital_list});
                })
            .catch((err) => {this.setState({errorMessage: "Could not fetch hospital list"})});
    }

    onChange = e =>
    {
        this.setState({ [e.target.id]: e.target.value });
    };

    clearFields = isSuccess =>
    {
        if(isSuccess)
            this.setState({ patient_name: "", dob_month: "", dob_date: "", dob_year: "", selectedHospital: null, errorMessage: "" })
        else
            this.setState({ successMessage: "" })
    }

    onSubmit = e =>
    {
        e.preventDefault();

        const dob = new Date(parseInt(this.state.dob_year),
                             parseInt(this.state.dob_month),
                             parseInt(this.state.dob_date));

        axios
            .put('/patient/create',
                 {
                     name: this.state.patient_name,
                     dob: dob.toDateString(),
                     hospital_id: this.state.selectedHospital.value
                 })
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
        const { selectedHospital } = this.state;
        const { errors } = this.state;

        return (
            <div style={{ height: "75vh" }} className="container valign-wrapper">
                <div className="row">
                    <div className="col s12 center-align">
                        <h4>
                            <b>Hey </b> {user.name.split(" ")[0]}
                        </h4>
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <h4>
                                <b>Add </b> a patient.
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
                                    isSearchable={this.state.isSearchable}
                                    value={selectedHospital}
                                    onChange={selectedHospital => this.setState({ selectedHospital })}
                                    options={this.state.hospital_list}
                                    placeholder="Select Hospital"
                                />
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.patient_name}
                                    error={errors.patient_name}
                                    id="patient_name"
                                    type="text"
                                    className={classnames("", {invalid: errors.patient_name})}
                                />
                                <label htmlFor="patient_name">Patient Name</label>
                                <span className="red-text">{errors.name}</span>
                            </div>
                            <div className="input-field col s12">
                                <table>
                                    <td>
                                        <br/>
                                        <input
                                            onChange={this.onChange}
                                            value={this.state.dob_month}
                                            id="dob_month"
                                            type="text"
                                            placeholder="mm"
                                            className={classnames("", {invalid: errors.dob_month})}
                                        />
                                    </td>
                                    <td>
                                        <br/>
                                        <input
                                            onChange={this.onChange}
                                            value={this.state.dob_date}
                                            id="dob_date"
                                            type="text"
                                            placeholder="dd"
                                            className={classnames("", {invalid: errors.dob_date})}
                                        />
                                    </td>
                                    <td>
                                        <br/>
                                        <input
                                            onChange={this.onChange}
                                            value={this.state.dob_year}
                                            id="dob_year"
                                            type="text"
                                            placeholder="yyyy"
                                            className={classnames("", {invalid: errors.dob_year})}
                                        />
                                    </td>
                                </table>
                                <label htmlFor="dob">Date of Birth</label>
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
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

addPatient.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({auth: state.auth});

export default connect(mapStateToProps)(addPatient);
