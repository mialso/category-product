export const Functor = {
    mapF() {},
    // <*> :: f (a -> b) -> f a -> f b
    applyF(getTransform, getItem) {
        if (typeof getTransform !== 'function' || typeof getItem !== 'function') {
            throw new Error('Unable to applyF: some argument is not a function');
        }
        const name = `${getTransform.name}_${getItem.name}`;
        const i = {
            [name](value) {
                return getTransform(value)(getItem(value));
            },
        };
        return i[name];
    },
    // pure :: a -> f a
    pureF(value) {
        const name = `pure(${value})`;
        const i = {
            [name]() {
                return value;
            },
        };
        return i[name];
    },
};

export const fmap = (func) => (item) => item.mapF(func);

// similar to redux-js implementation
export function compose(...funcs) {
    if (funcs.length === 0) {
        return (arg) => arg;
    }

    if (funcs.length === 1) {
        return funcs[0];
    }

    return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

export const composeF = (...funcs) => (functor = {}) => functor.mapF(compose(...funcs));

export function foldr() {
}

export function foldl() {
}
