import React from "react";
import { useSelector } from 'react-redux';
import {Link} from "react-router-dom";
import _startCase from 'lodash/startCase';

function DashboardHome() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="center-align">
      <h2 className="blue-text">Welcome back, {_startCase(user.name)}</h2>

      <p className="grey-text">Start composing a message ot a loved one to show how much you care!</p>

      <Link
        style={{
            width: '100%',
            maxWidth: '250px',
            borderRadius: '4px',
            letterSpacing: '1.5px',
            marginTop: '1rem',
            height: 'auto',
            paddingTop: 14
        }}
        to="/sendMessage"
        className="btn btn-large waves-effect waves-light hoverable blue accent-3"
      >
        <span
          style={{
            height: 24,
            width: 24,
            background: 'white',
            color: '#333',
            display: 'flex',
            borderRadius: '50%',
            margin: '0 auto',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <span className="material-icons">add</span>
        </span>
        Send Message
      </Link>
    </div>
  );
}

export default DashboardHome;
