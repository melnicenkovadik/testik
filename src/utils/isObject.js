const isObject = (value) => {
    return value !== null && typeof value === 'object' && value instanceof Object && !(value instanceof Array);
};

export default isObject;
