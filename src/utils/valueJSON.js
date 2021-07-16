const valueJSON = (value) => {
    return value.replace(/["{}\[\]]/g, '').replace(/^\s+/m, '');
};

export default valueJSON;
