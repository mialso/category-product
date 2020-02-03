import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { productMode, productEdited } from './selector';
import { MODE_EDIT, MODE_CREATE } from './constants';
import { submitProduct, productNormalMode } from './action';

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
    const {
        onSubmit, title, onClose, product,
    } = props;
    const [ inputProduct, setState ] = useState({
        ...product,
        expireDate: formatDate(product.expireDate),
    });
    useEffect(() => onClose, [ onClose ]);
    return (
        <div className="ProductInput">
            <h4>{ title }</h4>
            <div className="ProductInput-Field">
                <label>Pick name:</label>
                <input
                    type="text"
                    value={inputProduct.name}
                    onChange={(e) => setState({ ...inputProduct, name: e.target.value })}
                />
            </div>
            <div className="ProductInput-Field">
                <label>Pick price:</label>
                <input
                    type="text"
                    value={inputProduct.price}
                    onChange={(e) => setState({ ...inputProduct, price: e.target.value })}
                />
            </div>
            <div className="ProductInput-Field">
                <label>Pick expire date:</label>
                <input
                    type="date"
                    value={inputProduct.expireDate}
                    onChange={(e) => setState({ ...inputProduct, expireDate: e.target.value })}
                />
            </div>
            <button
                type="button"
                disabled={hasDiff(inputProduct, product)}
                onClick={() => onSubmit(inputProduct)}
            >
                Submit
            </button>
        </div>
    );
};

export const ProductCreate = () => {
    const product = useSelector(productEdited);
    const dispatch = useDispatch();
    return (
        <ProductInput
            title="Product Create"
            product={product}
            onClose={() => dispatch(productNormalMode())}
            onSubmit={(item) => dispatch(submitProduct(item))}
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
            onClose={() => dispatch(productNormalMode())}
            onSubmit={(item) => dispatch(submitProduct(item))}
        />
    );
};

export const ProductModal = () => {
    const mode = useSelector(productMode);
    switch (mode) {
        case MODE_EDIT: return (<ProductEdit />);
        case MODE_CREATE: return (<ProductCreate />);
        default: return null;
    }
};
