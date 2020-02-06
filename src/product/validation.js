const NAME_LENGTH_MIN = 5;
const NAME_LENGTH_MAX = 40;

export const parser = {
    name: (data) => (data.trim()),
    price: (data) => Number.parseInt(data, 10),
    expireDate: (data) => Date.parse(data),
};

export const validator = {
    name: (data) => {
        if (typeof data !== 'string') {
            return {
                isValid: false,
                message: 'Please, use "string" for Product [name]',
            };
        }
        const nameString = parser.name(data);
        if (!(nameString && nameString.length > NAME_LENGTH_MIN)) {
            return {
                isValid: false,
                message: `Please, create any Product::[name] longer than ${NAME_LENGTH_MIN} chars`,
            };
        }
        if (nameString.length > NAME_LENGTH_MAX) {
            return {
                isValid: false,
                message: `Please, create Product::[name] not longer than ${NAME_LENGTH_MIN} chars`,
            };
        }
        return { isValid: true, message: '', name: nameString };
    },
    price: (data) => {
        const priceNum = parser.price(data);
        if (Number.isNaN(priceNum)) {
            return {
                isValid: false,
                message: 'Please, use valid number for Product::[price]',
            };
        }
        return { isValid: true, message: '', price: priceNum };
    },
    expireDate: (data) => {
        // const utcMseconds = parser.expireDate(data);
        const utcMseconds = data * 1000;
        if (Number.isNaN(utcMseconds)) {
            return {
                isValid: false,
                message: 'Please, use valid date for Product::[expireDate]',
            };
        }
        const nowMseconds = Date.now();
        if (utcMseconds < nowMseconds) {
            return {
                isValid: false,
                message: 'Please, use date greater than now for Product::[expireDate]',
            };
        }
        return { isValid: true, message: '', expireDate: data };
    },
};
