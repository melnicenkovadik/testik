import React from 'react';
import './Item.scss';
import { getStyles } from '../../utils';


const Item = ({ title, children, style }) => {
    const mergeStyle = Object.assign({}, getStyles('components'), style);
    return (
        <div className='Item' style={mergeStyle}>
            {title && <h2 className='Item-title' style={getStyles('components_titles')}>{title}</h2>}
            {children}
        </div>
    );
};

export default Item;
