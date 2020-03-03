import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { readUser } from 'user/action';
import { REGULAR, GUEST } from 'user/constants';
import { currentUser, currentUserRole, userStatus } from 'user/selector';
import { NOT_ASKED, READY } from 'app/remote/constants';

export const RequireUser = ({ children }) => {
    const status = useSelector(userStatus);
    const dispatch = useDispatch();
    useEffect(() => {
        if (status === NOT_ASKED) {
            dispatch(readUser());
        }
    }, []);
    if (status !== READY) {
        return null;
    }
    return (<>{children}</>);
};

export const RegularUser = (Component) => {
    const user = useSelector(currentUser);
    if (user.role !== REGULAR) {
        return null;
    }
    return <Component user={user} />;
};

export const GuestUser = (Component) => {
    const role = useSelector(currentUserRole);
    if (role !== GUEST) {
        return null;
    }
    return (<Component />);
};

export const RegisteredUser = ({ children }) => {
    const role = useSelector(currentUserRole);
    if (role !== REGULAR) {
        return null;
    }
    return (<>{children}</>);
};

export const withRegularUser = (Component) => RegularUser.bind(null, Component);
export const withGuestUser = (Component) => GuestUser.bind(null, Component);
