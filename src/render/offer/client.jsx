import React from 'react';
import { connect } from 'react-redux';
import { offerCompanyName } from 'offer/selector';
import { changeCompanyName } from 'offer/action';

import './client.css';

export const ClientPickerRaw = ({ companyName, onChange }) => (
    <div className="ClientPicker">
        <label htmlFor="client-name">Name</label>
        <textarea name="client-name" type="text" value={companyName} onChange={onChange} />
    </div>
);

export const ClientPicker = connect(
    (state) => ({ companyName: offerCompanyName(state) }),
    { onChange: (e) => changeCompanyName(e.target.value) },
)(ClientPickerRaw);
