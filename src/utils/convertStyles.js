const convertStyles = (styles) => {
    const newStyles = {};
    Object.keys(styles).map((key) => {
        const nameArray = key.split('-');
        const styleName = nameArray.reduce((name, data, index) => {
            if (index > 0) {
                return `${name}${capitalize(data)}`;
            }
            return data;
        }, '');
        newStyles[styleName] = styles[key];
    });
    return newStyles;
};

const capitalize = (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
};

export default convertStyles;
