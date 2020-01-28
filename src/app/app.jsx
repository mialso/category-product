import React from 'react';
import { ProgressBar, UnseenError } from './common';
import { UserLogin, UserMenu } from '../user/login';
import { RemoteUser } from '../user/remote';

import './app.css';

export const Nothing = () => (<div>Nothing</div>);
export const NothingF = () => false;

export const UserSpinner = () => (<div>User spinner</div>);

export const Category = () => (<div>Category</div>);
export const CategoryCreate = () => (<div>Category create</div>);

export const Product = () => (<div>Product</div>);
export const ProductCreate = () => (<div>Product Create</div>);

export const App = () => (
    <div className="App">
        <div className="App-Notification">
            <ProgressBar />
            <UnseenError />
        </div>
        <RemoteUser>
            <div className="App-TopMenu">
                <UserMenu />
                <UserLogin />
            </div>
            <div className="App-Content">
                <Category />
                <Product />
            </div>
            <div className="App-Modal">
                <CategoryCreate />
                <ProductCreate />
            </div>
        </RemoteUser>
    </div>
);
