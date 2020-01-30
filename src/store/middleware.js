import { userData } from 'user/repository';
import { categoryData } from 'category/repository';
import { api } from 'remote/api';

export function connectMiddleware(controller) {
    return (store) => (next) => (message) => {
        next(message);
        controller(store, message);
    };
}

const middlewares = [ userData, categoryData, api ].map(connectMiddleware);

export default middlewares;
