import React from 'react';
import { connect } from 'react-redux';
import { viewIds, viewCurrentId, viewName } from 'app/view/selector';
import { setView } from 'app/view/action';

import './picker.css';

export const ViewButtonRaw = ({ name, onClick, isDisabled }) => (
    <button type="button" onClick={onClick} disabled={isDisabled}>{name}</button>
)

export const ViewButton = connect(
    (state, { id }) => ({
        name: viewName(id)(state),
        isDisabled: viewCurrentId(state) === id,
    }),
    (dispatch, { id }) => ({
        onClick: () => dispatch(setView(id)),
    }),
)(ViewButtonRaw);


export const ViewPickerRaw = ({ ids }) => (
    <div className="ViewPicker">
        { ids.map((id) => <ViewButton key={id} id={id} />) }
    </div>
)

export const ViewPicker = connect(
    (state) => ({
        ids: viewIds(state),
    }),
)(ViewPickerRaw);
