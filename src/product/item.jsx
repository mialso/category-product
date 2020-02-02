import React from 'react';
import { useSelector } from 'react-redux';
import { productById } from './reducer';

import './item.css';

export const formatLocal = (date) => new Date(date * 1000).toLocaleString();

export const ProductItem = ({ id }) => {
    const { name, expireDate, price } = useSelector(productById(id));
    return (
        <div className="ProductItem">
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
    );
};
