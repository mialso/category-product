import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from 'app/modal';

import './modal.css';

export const Modal = ({ children }) => {
    const { isOpen } = useSelector(({ modal }) => modal);
    const dispatch = useDispatch();
    if (!isOpen) {
        return null;
    }
    return (
        <div className="Modal">
            <div className="Modal-Content">
                <button
                    className="AppButton-Icon Modal-Close"
                    type="button"
                    onClick={() => dispatch(closeModal())}
                >
                    <span className="fas fa-times" />
                </button>
                {children}
            </div>
        </div>
    );
};
