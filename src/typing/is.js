export const is = {
    function: (value) => {
        return typeof value === 'function';
    },
    string: (value) => {
        return typeof value === 'string';
    },
    object: (value) => {
        return value != null && typeof value === 'object' && !Array.isArray(value);
    },
    array: (value) => {
        return Array.isArray(value);
    },
};
