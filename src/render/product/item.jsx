import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { productById } from 'product/selector';
import { updateProduct, deleteProduct } from 'product/action';

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

export const ProductAction = ({ id }) => {
    const dispatch = useDispatch();
    return (
        <div className="ProductAction">
            <button
                className="ProductAction-Button"
                type="button"
                onClick={() => dispatch(updateProduct(id))}
            >
                <span className="fas fa-pen" />
                Edit
            </button>
            <button
                className="ProductAction-Button"
                type="button"
                onClick={() => dispatch(deleteProduct(id))}
            >
                <span className="fas fa-times" />
                Delete
            </button>
        </div>
    );
}
