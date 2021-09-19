import { Monad } from 'type/Monad';

export const MAYBE = 'Maybe';

export function Nothing() {
    const maybe = Object.create(Maybe);
    maybe.Nothing = true;
    return Object.freeze(maybe);
}

export function Just(value) {
    if (!value) {
        return Nothing();
    }
    const maybe = Object.create(Maybe);
    maybe.Just = Object.freeze(value);
    return Object.freeze(maybe);
}

export const Maybe = {
    ...Monad,
    ...{
        toString() {
            if (this.Just) {
                return `Just ${JSON.stringify(this.Just)}`;
            }
            return 'Nothing';
        },
        // id morphism ???
        id() {
            return Nothing();
        },
        // Functor instance
        mapF(f) {
            if (this.Nothing) {
                return Nothing();
            }
            return Just(f(this.Just));
        },
        // Monad instance
        // (a -> Maybe b) -> Maybe b
        bindM(f) {
            // TODO: handle "return" and "fail" cases
            if (this.Nothing) {
                return Nothing();
            }
            return f(this.Just);
        },
        // a -> Maybe a
        returnM(value) {
            if (this.Nothing) {
                return this;
            }
            if (value === null || value === undefined) {
                return Nothing();
            }
            return Just(value);
        },
        // a -> Maybe a
        failM() {
            return Nothing();
        },
        // TODO: refactor this to be common for all data containers
        data: MAYBE,
    },
};
