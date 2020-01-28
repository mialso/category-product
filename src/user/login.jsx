import React, { useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { userLogin, userLogout } from './action';
import { currentUser } from './selector';
import { withRegularUser, withGuestUser } from './remote';

import './login.css';

export const Login = ({ runUserLogin }) => {
    const [ name, setName ] = useState('');
    return (
        <div className="Login">
            <label>
                Please, enter your name:
            </label>
            <input
                className="Login-Input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button
                className="Login-Button"
                type="button"
                disabled={!name}
                onClick={() => runUserLogin(name)}
            >
               Login
            </button>
        </div>
    );
};

export const Menu = ({ user, runUserLogout }) => {
    return (
        <div className="UserMenu">
            <span>Content for:</span>
            <b>{user.name}</b>
            <button
                className="UserMenu-Logout"
                type="button"
                onClick={() => runUserLogout()}
            >
                Logout
            </button>
        </div>
    );
};

export const UserLogin = compose(
    withGuestUser,
    connect(null, { runUserLogin: userLogin }),
)(Login);

export const UserMenu = compose(
    withRegularUser,
    connect(currentUser, { runUserLogout: userLogout }),
)(Menu);
