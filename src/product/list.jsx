import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CategorySelect } from 'category/select';
import { NOT_ASKED, READY } from '../constants';
import { productState, productIds } from './reducer';
import { readProducts } from './action';
import { ProductItem } from './item';

import './list.css';

export const ProductList = () => {
    const ids = useSelector(productIds);
    return (
        <div className="ProductList">
            <div className="ProductList-Header">
                <h4>Product List</h4>
                <CategorySelect />
                <button
                    className="ProductList-Button"
                    type="button"
                >
                    add
                </button>
            </div>
            { ids.map((id) => <ProductItem key={id} id={id} />) }
        </div>
    );
}

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
