import React from 'react';
import { connect } from 'react-redux';
import { offerTitle } from 'offer/selector';
import { changeTitle } from 'offer/action';

import './title.css';

export const TitlePickerRaw = ({ title, onChange }) => (
    <div className="TitlePicker">
        <label htmlFor="title-text">Title</label>
        <textarea name="title-text" type="text" value={title} onChange={onChange} />
    </div>
);

export const TitlePicker = connect(
    (state) => ({ title: offerTitle(state) }),
    { onChange: (e) => changeTitle(e.target.value) },
)(TitlePickerRaw);
