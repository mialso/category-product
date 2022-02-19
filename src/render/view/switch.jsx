import React from 'react';
import { connect } from 'react-redux';
import { viewCurrentId } from 'app/view/selector';

export const ViewSwitchRaw = ({ currentId, views }) => {
    const Component = views[currentId]
    if (!Component) {
        return null;
    }
    return (<Component />)
}

export const ViewSwitch = connect(
    (state) => ({ currentId: viewCurrentId(state) }),
)(ViewSwitchRaw);
