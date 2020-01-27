import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRemoteUser, withRegularUser } from '../user/remote';
import { ConnectedUserLogout } from '../user/login';

export const mapStateToProps = ({ user }) => user.currentUser;

export const Content = ({ name }) => (
    <div>
        <div>
            <span>Content for:</span>
            <b>{name}</b>
        </div>
        <ConnectedUserLogout />
    </div>
);

export default compose(
    withRemoteUser,
    withRegularUser,
    connect(mapStateToProps),
)(Content);
