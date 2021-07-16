
import React from 'react';
import TableRow from '../../components/TableRow';
import { getStyles, isObject, valueJSON } from '../../utils';

const CustomData = ({ asset }) => {
    const assetCustomData = asset.customData ? asset.customData : [];
    return (
        assetCustomData.map((row, index) => {
            return (
                <div key={index}>
                    <hr className='table-seperator ' />
                    <h3 className='table-subtitle' style={getStyles('components_subtitles')}>{row.title}</h3>
                    <div className='table '>
                        {row.values.map((custom,index) => {
                            return (
                                <TableRow title={custom.title} value={isObject(custom.value) ? valueJSON(JSON.stringify(custom.value, null, 5)) : custom.value} key={index} />
                            );
                        })}
                    </div>
                </div>
            );
        })
    );
};

export default CustomData;
