export const loopExclude = (items, filter) => {
    if (!items || !filter) {
        return items;
    }
    return Object.entries(items).filter(([key, value]) => {
        if (filter.indexOf(key) < 0) {
            return {key: value};
        }
    });
};

export const loopInclude = (items, filter) => {
    if (!items || !filter) {
        return items;
    }
    return Object.entries(items).filter(([key, value]) => {
        if (filter.indexOf(key) > -1) {
            return {key, value};
        }
    });
};
