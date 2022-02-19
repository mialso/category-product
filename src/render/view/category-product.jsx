import React from 'react';
import { RequireCategories, CategorySelector } from '../category/list';
import { RequireProducts } from '../product/list';
import { ConnectedProductList } from '../content';

export const CategoryProductView = () => (
    <RequireCategories>
        <CategorySelector />
        <RequireProducts>
            <ConnectedProductList />
        </RequireProducts>
    </RequireCategories>
)
