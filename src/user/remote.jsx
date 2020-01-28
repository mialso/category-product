import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { readUser } from './action';
import {
    NOT_ASKED, READY, REGULAR, GUEST,
} from './constants';

export const mapStateToProps = ({ user }) => user;

export const RemoteUser = ({ children }) => {
    const user = useSelector(mapStateToProps);
    const dispatch = useDispatch();
    useEffect(() => {
        if (user.dataStatus === NOT_ASKED) {
            dispatch(readUser());
        }
    }, []);
    if (user.dataStatus !== READY) {
        return null;
    }
    return (<>{children}</>);
};

export const RegularUser = (Component) => {
    const currentUser = useSelector(({ user }) => user.currentUser);
    const role = currentUser ? currentUser.role : '';
    if (role !== REGULAR) {
        return null;
    }
    return <Component />;
};

export const GuestUser = (Component) => {
    const currentUser = useSelector(({ user }) => user.currentUser);
    const role = currentUser ? currentUser.role : '';
    if (role !== GUEST) {
        return null;
    }
    return (<Component />);
};

export const withRegularUser = (Component) => RegularUser.bind(null, Component);
export const withGuestUser = (Component) => GuestUser.bind(null, Component);
