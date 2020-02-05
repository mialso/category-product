import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { productMode, productEdited } from './selector';
import { MODE_EDIT, MODE_CREATE } from './constants';
import { productNormalMode } from './action';

export const formatDate = (date) => {
    if (!date) {
        return '';
    }
    return new Date(date * 1000).toISOString().split('T')[0];
};

export const hasDiff = (input, product) => {
    const inputProduct = { ...input, expireDate: Date.parse(input.expireDate) / 1000 };
    return shallowEqual(inputProduct, product);
};

export const ProductInput = (props) => {
    const { title, product, onChange } = props;
    // useEffect(() => onUnmount, [ onUnmount ]);
    return (
        <div className="ProductInput">
            <h4>{ title }</h4>
            <div className="ProductInput-Field">
                <label>Pick name:</label>
                <input
                    type="text"
                    value={product.name}
                    onChange={(e) => onChange({ name: e.target.value })}
                />
            </div>
            <div className="ProductInput-Field">
                <label>Pick price:</label>
                <input
                    type="text"
                    value={product.price}
                    onChange={(e) => onChange({ price: e.target.value })}
                />
            </div>
            <div className="ProductInput-Field">
                <label>Pick expire date:</label>
                <input
                    type="date"
                    value={formatDate(product.expireDate)}
                    onChange={(e) => onChange({ expireDate: e.target.valueAsNumber / 1000 || 0 })}
                />
            </div>
        </div>
    );
};

export const ProductCreate = () => {
    const product = useSelector(productEdited);
    // TODO: usecallback
    const dispatch = useDispatch();
    return (
        <ProductInput
            title="Product Create"
            product={product}
            onUnmount={() => dispatch(productNormalMode())}
        />
    );
};

export const ProductEdit = () => {
    const product = useSelector(productEdited);
    const dispatch = useDispatch();
    return (
        <ProductInput
            title="Product Edit"
            product={product}
            onUnmount={() => dispatch(productNormalMode())}
        />
    );
};

export const ProductForm = () => {
    const mode = useSelector(productMode);
    switch (mode) {
        case MODE_EDIT: return (<ProductEdit />);
        case MODE_CREATE: return (<ProductCreate />);
        default: return null;
    }
};
