import { Functor } from 'type/Functor';
// TODO
export const Monad = {
    ...Functor,
    ...{
        bindM() {},
        failM() {},
        returnM() {},
        apM() {},
    },
};

export function isMonad(monad) {
    return Object.keys(Monad).reduce(
        (hasKey, key) => hasKey && typeof monad[key] === 'function',
        true,
    );
}
// TODO: handle arguments list...???
// MonadClass a -> [ a -> MonadClass b ] -> MonadClass b
export const reduceM = (monad = {}) => (...items) => {
    if (!(isMonad(monad))) {
        throw new Error(`Unable to reduceM: no valid monad given: ${JSON.stringify(monad)}`);
    }
    if (!(Array.isArray(items) && items.length)) {
        return monad;
    }
    return items.reduce(
        (prev, func) => {
            if (prev.data !== monad.data) {
                return monad.failM(prev);
            }
            return prev.bindM(func);
        },
        monad,
    );
};
// ( a -> MonadClass b ) -> MonadClass a -> MonadClass b
export const composeM = (...items) => (monad = {}) => reduceM(monad)(...items.reverse());

export const liftM = (func) => (item) => item.returnM(item.bindM(func));
