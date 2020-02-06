import React from 'react';
import { UserLogin, UserMenu } from './user/login';
import { RequireUser, RegisteredUser } from './user/remote';
import { RequireCategories, CategorySelector } from './category/list';
import { CategoryEditor } from './category/input';
import { RequireProducts } from './product/list';
import { Modal } from './modal';
import { ProgressBar, UnseenError } from './common';
import { ConnectedProductList, ProductEditor } from './content';

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
                        <CategorySelector />
                        <RequireProducts>
                            <ConnectedProductList />
                        </RequireProducts>
                    </RequireCategories>
                </div>
                <Modal>
                    <CategoryEditor />
                    <ProductEditor />
                </Modal>
            </RegisteredUser>
        </RequireUser>
    </div>
);
