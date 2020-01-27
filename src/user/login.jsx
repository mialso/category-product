import React, { useState } from 'react';
import { connect } from 'react-redux';
import { userLogin, userLogout } from './action';

export const UserLogin = ({ runUserLogin }) => {
    const [ name, setName ] = useState('');
    return (
        <div>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button
                type="button"
                disabled={!name}
                onClick={() => runUserLogin(name)}
            >
               Login
            </button>
        </div>
    );
};

export const UserLogout = ({ runUserLogout }) => {
    return (
        <button
            type="button"
            onClick={() => runUserLogout()}
        >
            Logout
        </button>
    );
};

export const ConnectedUserLogin = connect(
    null, { runUserLogin: userLogin },
)(UserLogin);

export const ConnectedUserLogout = connect(
    null, { runUserLogout: userLogout },
)(UserLogout);
