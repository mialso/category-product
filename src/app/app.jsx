import React from 'react';
import { UserLogin, UserMenu } from 'user/login';
import { RequireUser, RegisteredUser } from 'user/remote';
import { RequireCategories, CategoryList } from 'category/list';
import { CategoryModal } from 'category/input';
import { RequireProducts } from 'product/list';
import { Modal } from 'ui/modal/component';
import { ProgressBar, UnseenError } from './common';
import { ProductList, ProductEditor } from './product';

import './app.css';
import '@fortawesome/fontawesome-free/css/all.css';

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
            <RegisteredUser>
                <div className="App-Content">
                    <RequireCategories>
                        <CategoryList />
                        <RequireProducts>
                            <ProductList />
                        </RequireProducts>
                    </RequireCategories>
                </div>
                <Modal>
                    <CategoryModal />
                    <ProductEditor />
                </Modal>
            </RegisteredUser>
        </RequireUser>
    </div>
);
