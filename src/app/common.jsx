import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isAnyLoading } from 'remote/reducer';
import { unseenError, markSeenError } from './error';

import './common.css';

export const ProgressBar = () => {
    const isLoading = useSelector(isAnyLoading);
    if (!isLoading) {
        return null;
    }
    return (<div className="ProgressBar" />);
};

export const UnseenError = () => {
    const error = useSelector(unseenError);
    const dispatch = useDispatch();
    if (!error) {
        return null;
    }
    return (
        <div className="UnseenError">
            <span>{ error }</span>
            <button
                type="button"
                className="UnseenError-Close"
                onClick={() => dispatch(markSeenError())}
            >
                x
            </button>
        </div>
    );
};
