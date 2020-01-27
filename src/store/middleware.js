import { userData } from '../user/repository';
import { api } from '../app/api';

export function connectMiddleware(controller) {
    return (store) => (next) => (message) => {
        next(message);
        controller(store, message);
    };
}

const middlewares = [ userData, api ].map(connectMiddleware);

export default middlewares;
