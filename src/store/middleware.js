import { userData } from 'user/repository';
import { categoryData } from 'category/repository';
import { productData } from 'product/repository';
import { api } from 'app/remote/api';
import { formController } from 'app/form/controller';

export function connectMiddleware(controller) {
    return (store) => (next) => (message) => {
        next(message);
        controller(store, message);
    };
}

const middlewares = [
    userData,
    categoryData,
    productData,
    api,
    formController,
].map(connectMiddleware);

export default middlewares;
