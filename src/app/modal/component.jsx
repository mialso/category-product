import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from 'ui/modal';

import './component.css';

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
                    type="button"
                    onClick={() => dispatch(closeModal())}
                >
                    Close
                </button>
                {children}
            </div>
        </div>
    );
};
