import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CategoryItems } from 'category/input';
import { CategoryPicker } from 'category/select';
import { ProductItem, ProductEdit } from 'product/item';
import { ProductInput } from 'product/input';
import { productIds } from 'product/selector';
import { createProduct } from 'product/action';
import { formProduct } from './form/reducer';
import { changeFormProduct, stopFormEdit } from './form/action';
import { MODE_CREATE } from './form/constants';

export const ProductCard = ({ id }) => (
    <div className="Card ProductItem">
        <ProductItem id={id} />
        <CategoryItems productId={id} />
        <ProductEdit id={id} />
    </div>
);

export const ProductEditor = () => {
    const { product, mode } = useSelector(formProduct);
    const dispatch = useDispatch();
    useEffect(() => () => dispatch(stopFormEdit()), []);
    return (
        <>
            <ProductInput
                title={`Product ${mode === MODE_CREATE ? 'Create' : 'Edit'}`}
                onChange={(change) => dispatch(changeFormProduct(change))}
                product={product}
            />
            <div className="ProductInput-Category">
                <h4>Categories Select</h4>
                <CategoryPicker
                    selectedIds={product.categoryIds || []}
                    onChange={(ids) => dispatch(changeFormProduct({ categoryIds: ids }))}
                />
            </div>
            <button
                type="button"
            >
                Submit
            </button>
        </>
    );
};

export const ProductList = () => {
    const ids = useSelector(productIds);
    const dispatch = useDispatch();
    return (
        <div className="ProductList">
            <div className="ProductList-Header">
                <h4>Product List</h4>
                <button
                    className="ProductList-Button"
                    type="button"
                    onClick={() => dispatch(createProduct())}
                >
                    add
                </button>
            </div>
            { ids.map((id) => <ProductCard key={id} id={id} />) }
        </div>
    );
};
