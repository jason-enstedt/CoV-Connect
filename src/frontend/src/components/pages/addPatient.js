import React, { useEffect, useState } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import Select from 'react-select';
import axios from 'axios';
import _map from 'lodash/map';

function AddPatient() {
  const { user } = useSelector(({ auth }) => auth);
  const [initialLoad, setInitialLoad] = useState(true);
  const [state, setState] = useState({
    patient_name: "",
    dob_date: "",
    dob_month: "",
    dob_year: "",
    hospitalList: [],
    selectedHospital: null,
    errors: {},
    successMessage: "",
    errorMessage: "",
    focused: false,
    isSearchable: true
  });
  const { errors, selectedHospital } = state;

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);

      axios.get('/hospital/fetch')
        .then((res) => {
          const hospitalList = _map(res.data.hospitals, (hospital) => ({
            value: hospital.id,
            label: hospital.name,
          }));

          setState({ ...state, hospitalList: hospitalList });
        }).catch((err) => {
          setState({ ...state, errorMessage: "Could not fetch hospital list" });
        });
    }
  }, [initialLoad, state, setState]);

  function onChange(e) {
    setState({ ...state, [e.target.id]: e.target.value });
  };

  function clearFields(error) {
    if(!error) {
      setState({ ...state, patient_name: "", dob_month: "", dob_date: "", dob_year: "", selectedHospital: null, errorMessage: "" })
    } else {
      setState({ ...state, errorMessage: error, successMessage: "" })
    }
  }

  function onSubmit(e) {
    e.preventDefault();

    const dob = new Date(parseInt(state.dob_year),
                         parseInt(state.dob_month),
                         parseInt(state.dob_date));

    axios.put('/patient/create', {
      name: state.patient_name,
      dob: dob.toDateString(),
      hospital_id: state.selectedHospital.value
    }).then((res) => {
      if(res.status === 200) {
        setState({successMessage: res.data.message});
        clearFields(true);
      } else {
        setState({errorMessage: res.data.message})
        clearFields(false);
      }
    }).catch((err) => {
      setState({errorMessage: err.message});
      clearFields(false);
    });
  }

  return (
    <div className="row">
      <div className="col s12">

        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
          <h6>
            <b>Add </b> a patient.
          </h6>
        </div>
        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
          <h5>
            <b style={{ color: "green" }}>{state.successMessage}</b>
          </h5>
        </div>
        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
          <h5>
            <b style={{ color: "red" }}>{state.errorMessage}</b>
          </h5>
        </div>
        <form noValidate onSubmit={onSubmit}>
          <div className="input-field col s12">
            <Select
              isSearchable={state.isSearchable}
              value={selectedHospital}
              onChange={selectedHospital => setState({ selectedHospital })}
              options={state.hospitalList}
              placeholder="Select Hospital"
            />
          </div>
          <div className="input-field col s12">
            <input
              onChange={onChange}
              value={state.patient_name}
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
                  onChange={onChange}
                  value={state.dob_month}
                  id="dob_month"
                  type="text"
                  placeholder="mm"
                  className={classnames("", {invalid: errors.dob_month})}
                />
              </td>
              <td>
                <br/>
                <input
                  onChange={onChange}
                  value={state.dob_date}
                  id="dob_date"
                  type="text"
                  placeholder="dd"
                  className={classnames("", {invalid: errors.dob_date})}
                />
              </td>
              <td>
                <br/>
                <input
                  onChange={onChange}
                  value={state.dob_year}
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
            {/* <button */}
            {/*   style={{ */}
            {/*     width: "150px", */}
            {/*     borderRadius: "3px", */}
            {/*     letterSpacing: "1.5px", */}
            {/*     marginTop: "1rem" */}
            {/*   }} */}
            {/*   type="submit" */}
            {/*   className="btn btn-large waves-effect waves-light hoverable blue accent-3" */}
            {/* > */}
            {/*   Add */}
            {/* </button> */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPatient;
