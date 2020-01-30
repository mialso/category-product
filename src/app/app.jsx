import React from 'react';
import { UserLogin, UserMenu } from 'user/login';
import { RequireUser } from 'user/remote';
import { RequireCategories, CategoryList } from 'category/list';
import { ProgressBar, UnseenError } from './common';

import './app.css';

export const Nothing = () => (<div>Nothing</div>);
export const NothingF = () => false;

export const UserSpinner = () => (<div>User spinner</div>);

export const CategoryCreate = () => (<div>Category create</div>);

export const Product = () => (<div>Product</div>);
export const ProductCreate = () => (<div>Product Create</div>);

export const App = () => (
    <div className="App">
        <div className="App-Notification">
            <ProgressBar />
            <UnseenError />
        </div>
        <RequireUser>
            <div className="App-TopMenu">
                <UserMenu />
                <UserLogin />
            </div>
            <div className="App-Content">
                <RequireCategories>
                    <CategoryList />
                </RequireCategories>
                <Product />
            </div>
            <div className="App-Modal">
                <CategoryCreate />
                <ProductCreate />
            </div>
        </RequireUser>
    </div>
);
