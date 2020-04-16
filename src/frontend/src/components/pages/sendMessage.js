import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import classnames from "classnames";
import axios from "axios";
import Select from "react-select";
import _map from 'lodash/map';
import AddPatient from './addPatient';

function SendMessage() {
  const { user } = useSelector(({ auth }) => auth);
  const [initialLoad, setInitialLoad] = useState(true);
  const [selected, setSelected] = useState('existing');
  const [state, setState] = useState({
    selectedPatient: null,
    patientList: [],
    message: "",
    errors: {},
    successMessage: "",
    errorMessage: ""
  });
  const { errors, selectedPatient } = state;
  const selectStyles = { menu: styles => ({ ...styles, zIndex: 999 }) };

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
      axios.get('/patient/fetch')
        .then((res) => {
          const patientList = _map(res.data.patients, patient => ({
            value: patient,
            label: patient.patient_details.name,
          }));

          setState({ ...state, patientList: patientList });
        }).catch((err) => {
          setState({ ...state, errors: { error: err.message } });
        });
    }
  }, [initialLoad, state, setState]);

  function clearFields(error) {
    if(!error) {
      setState({
        ...state,
        selectedPatient: null,
        message: "",
        errorMessage: "",
      });
    } else {
      setState({
        ...state,
        errorMessage: error,
        successMessage: "",
      });
    }
  }

  function onChange(e) {
    setState({
      ...state,
      [e.target.id]: e.target.value,
    });
  };

  function onSubmit(e) {
    e.preventDefault();

    axios.put('/message/create', {
      patient_id: state.selectedPatient.value.patient_details.id,
      message: state.message,
    }).then((res) => {
      if(res.status === 200) {
        setState({ successMessage: res.data.message });
        clearFields(true);
      } else {
        clearFields(res.data.message);
      }
    }).catch((err) => {
      clearFields(err.message);
    });
  }

  return (
    <div className="valign-wrapper">
      <div className="card">
        <div className="row" style={{ padding: 8 }}>
          <div className="col s12">
            <h4 className="grey-text text-darken-1">Send a Message</h4>
            <p className="grey-text">
              Your note will be printed onto labels and affixed to patient's food containers.
              <br />
              Tell them how much you care!
            </p>

            <h5 className="blue-text"><b>Patient</b></h5>
            <p className="grey-text">
              Select your recipient from the drop-down, or create
              a new patient if you are sending for the first time.
            </p>
          </div>

          <div className="col s12">
            <div style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
              <div
                onClick={() => setSelected('existing')}
                style={{ width: 40, cursor: 'pointer' }}
              >
                <i className="material-icons">{ selected === 'existing' ? 'radio_button_checked' : 'radio_button_unchecked'}</i>
              </div>
              <div style={{ width: '100%' }}>
                <Select
                  styles={selectStyles}
                  value={selectedPatient}
                  onChange={selectedPatient => setState({ ...state, selectedPatient })}
                  options={state.patientList}
                  placeholder="Select Patient"
                />
              </div>
            </div>
          </div>

          <div className="col s12" style={{ marginTop: 16 }}>
            <div style={{ display: 'flex', width: '100%' }}>
              <div
                onClick={() => setSelected('new')}
                style={{ width: 40, cursor: 'pointer', marginTop: 10 }}
              >
                <i className="material-icons">{ selected !== 'existing' ? 'radio_button_checked' : 'radio_button_unchecked'}</i>
              </div>
              <div style={{ width: '100%' }}>
                <AddPatient />
              </div>
            </div>
          </div>


          <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            <h5 className="blue-text">
              <b>Your message</b>
            </h5>
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
              <textarea
                onChange={onChange}
                value={state.message}
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

export default SendMessage;
