import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { readUser } from './action';
import {
    NOT_ASKED, ASKED, LOADING, READY, REGULAR, GUEST,
} from './constants';
import { ConnectedUserLogin } from './login';

export const Error = ({ message }) => (
    <div>
        <b>Error:</b>
        <span>{message}</span>
    </div>
);

export const Wait = () => (
    <div>Please wait...</div>
);

export const Spinner = () => (<div>Spinner</div>);

export const mapStateToProps = ({ user }) => user;

export const RemoteUser = (Component) => {
    const user = useSelector(mapStateToProps);
    const dispatch = useDispatch();
    useEffect(() => {
        if (user.dataStatus === NOT_ASKED) {
            dispatch(readUser());
        }
    }, []);
    switch (user.dataStatus) {
        case ASKED: return <Wait />;
        case LOADING: return <Spinner />;
        case READY: return <Component />;
        default: return <Error message="remote user" />;
    }
};

export const RegularUser = (Component) => {
    const currentUser = useSelector(({ user }) => user.currentUser);
    const role = currentUser ? currentUser.role : '';
    switch (role) {
        case REGULAR: return <Component />;
        case GUEST: return <ConnectedUserLogin />;
        default: return <Error message="regular user" />;
    }
};

export const withRemoteUser = (Component) => RemoteUser.bind(null, Component);
export const withRegularUser = (Component) => RegularUser.bind(null, Component);
