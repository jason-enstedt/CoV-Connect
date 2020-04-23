import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
//import classnames from "classnames";
import axios from "axios";
//import Select from "react-select";
import _map from 'lodash/map';
function SentMessages() {
  const { user } = useSelector(({ auth }) => auth);
  const [initialLoad, setInitialLoad] = useState(true);
 // const [selected, setSelected] = useState('existing');
 // const [deliveredMessages, setDeliveredMessages] = useState([]);
  const [sentMessages, setSentMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messageTable, setMessageTable] = useState([]);
  //const [showDelivered, setShowDelivered] = useState(false);
  const [state, setState] = useState({
    errors: {},
    successMessage: "",
    errorMessage: ""
  });
  //const { errors, selectedPatient } = state;
 // const selectStyles = { menu: styles => ({ ...styles, zIndex: 999 }) };


  //This useEffect loads all of the users messages that they have sent 
  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
      axios.get('/message/fetch')
        .then((res) => {
          let messageList = _map(res.data.messages, oneMessage => ({
            id: oneMessage._id,
            date: oneMessage.message, //This retrieves the message currently, needs to change to the timestamp
            name: oneMessage.patient_id, //This returns the patient ID not their actual name, needs to change
            status: oneMessage.status //This returns the status number, needs to change to either Delivered or Processing
          }));
          if(messageList !== []){
            const messageTable = _map(messageList, oneMessage => {
              return(
                <tr key={oneMessage.id}>
                  <td>{oneMessage.date}</td>
                  <td>{oneMessage.name}</td>
                  <td>{oneMessage.status == 1 ? "Delivered" : "Processing"}</td>
                </tr>
              )
            });
            setMessageTable(messageTable);
            setSentMessages(messageList.length);
            setLoading(false);
          }else{ 
          }
        }).catch((err) => {
          setState({ ...state, errors: { error: err.message } });
        });
    }
  }, [initialLoad, state, setState]);
  return (
    <div className="valign-wrapper">
      <div className="card">
        <div className="row" style={{ padding: 8 }}>
          <div className="col s12">
            <h4 className="grey-text text-darken-1">Sent Messages</h4>
            <p className="grey-text">
              Keep track of the delivery status of all your sent messages. Click on any row to view message details.
            </p>
            <div className="row">
            <button className="btn active">All({sentMessages})</button>
            <button className="btn" >Delivered({})</button>
            </div>
            {loading == true ? <div className="progress">
                <div className="indeterminate"></div>
            </div> : ""}
            {/* <div className="progress">
                <div class="indeterminate"></div>
            </div> */}
            <table className="striped">
                <thead>
                    <tr>
                        <th>Sent Time</th>
                        <th>Patient Name</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                  {messageTable}
                </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SentMessages;