import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { productById } from './selector';
import { updateProduct } from './action';

import './item.css';

export const formatLocal = (date) => {
    if (!date) {
        return '';
    }
    return new Date(date * 1000).toLocaleString();
};

export const ProductItem = ({ id }) => {
    const { name, expireDate, price } = useSelector(productById(id));
    return (
        <div className="ProductItem">
            <div className="ProductItem-Content">
                <div className="ProductItem-Name">{name}</div>
                <div className="ProductItem-Price">
                    <span>{price}</span>
                    <span>$</span>
                </div>
                <div className="ProductItem-Expiration">
                    <span>expires at:</span>
                    <span>{formatLocal(expireDate)}</span>
                </div>
            </div>
        </div>
    );
};

export const ProductEdit = ({ id }) => {
    const dispatch = useDispatch();
    return (
        <div className="ProductItem-Action">
            <button
                type="button"
                onClick={() => dispatch(updateProduct(id))}
            >
                Edit
            </button>
        </div>
    );
}
