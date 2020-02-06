import React, { useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { productIdsByCategoryIds } from 'product/selector';
import { createProduct } from 'product/action';
import { formProduct } from 'app/form/reducer';
import { changeFormProduct, stopFormEdit, submitFormProduct } from 'app/form/action';
import { MODE_NORMAL, MODE_CREATE } from 'app/form/constants';
import { CategoryItems } from './category/input';
import { CategoryPicker } from './category/select';
import { ProductItem, ProductAction } from './product/item';
import { ProductInput } from './product/input';

import './content.css';

export const ProductCard = ({ id }) => (
    <div className="Card AppProduct">
        <ProductItem id={id} />
        <CategoryItems productId={id} />
        <ProductAction id={id} />
    </div>
);

export const ProductEditor = () => {
    const { product, mode } = useSelector(formProduct);
    const dispatch = useDispatch();
    useEffect(() => () => dispatch(stopFormEdit()), []);
    if (mode === MODE_NORMAL) {
        return null;
    }
    return (
        <>
            <ProductInput
                title={`Product ${mode === MODE_CREATE ? 'Create' : 'Edit'}`}
                onChange={(change) => dispatch(changeFormProduct(change))}
                product={product}
            />
            <CategoryPicker
                selectedIds={product.categoryIds || []}
                onChange={(ids) => dispatch(changeFormProduct({ categoryIds: ids }))}
            />
            <button
                type="button"
                onClick={() => dispatch(submitFormProduct())}
            >
                Submit
            </button>
        </>
    );
};

export const ProductList = ({ ids, startCreateProduct }) => (
    <div className="ProductList">
        <div className="ProductList-Header">
            <h4>Product List</h4>
            <button
                className="ProductList-Button"
                type="button"
                onClick={() => startCreateProduct()}
            >
                <span className="fas fa-plus" />
                product
            </button>
        </div>
        { ids.map((id) => <ProductCard key={id} id={id} />) }
    </div>
);

export const ConnectedProductList = connect(
    (state) => ({
        ids: productIdsByCategoryIds(state.category.selected)(state) || [],
    }),
    { startCreateProduct: createProduct },
)(ProductList);
