import React from 'react';
import { UserLogin, UserMenu } from './user/login';
import { RequireUser, RegisteredUser } from './user/remote';
import { CategoryEditor } from './category/input';
import { Modal } from './modal';
import { ProgressBar, UnseenError } from './common';
import { ProductEditor } from './content';
import { CategoryProductView } from './view/category-product';
import { OfferView } from './view/offer';
import { ViewPicker } from './view/picker';
import { ViewSwitch } from './view/switch';
import { OFFER_VIEW, CATEGORY_PRODUCT_VIEW } from '../app/view/constant';

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
                <ViewPicker />
                <UserMenu />
                <UserLogin />
            </div>
            <RegisteredUser>
                <div className="App-Content">
                    <ViewSwitch views={{
                        [CATEGORY_PRODUCT_VIEW]: CategoryProductView,
                        [OFFER_VIEW]: OfferView,
                    }} />
                </div>
                <Modal>
                    <CategoryEditor />
                    <ProductEditor />
                </Modal>
            </RegisteredUser>
        </RequireUser>
    </div>
);
