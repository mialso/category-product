import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NOT_ASKED, READY } from 'app/remote/constants';
import { productState } from 'product/selector';
import { readProducts } from 'product/action';

export const RequireProducts = ({ children }) => {
    const product = useSelector(productState);
    const dispatch = useDispatch();
    useEffect(() => {
        if (product.dataStatus === NOT_ASKED) {
            dispatch(readProducts());
        }
    }, []);
    if (product.dataStatus !== READY) {
        return null;
    }
    return (<>{children}</>);
};
