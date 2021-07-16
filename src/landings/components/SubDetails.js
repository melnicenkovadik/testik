import React from 'react';
import './SubDetails.scss';
import { getStyles, valueJSON } from '../../utils';
import { isObject } from 'util';
import TableRow from '../../components/TableRow';


const SubDetails = ({ asset }) => {
    return (
        <React.Fragment>
            {
                asset && asset.info && asset.map((value, index) => {
                    return (
                        <div key={index}>
                            <hr className='table-seperator ' />
                            <h3 className='table-subtitle' style={getStyles('components_subtitles')}>{value.key}</h3>
                            <div className='table'>
                                {Object.entries(value.value).map(([k, v]) => (
                                    !Array.isArray(value) && (
                                        <TableRow key={k} title={k} value={isObject(v) ? valueJSON(JSON.stringify(v, null, 5)) : v} />
                                    )
                                ))}
                            </div>
                        </div>
                    );
                })
            }
        </React.Fragment>
    );
};

export default SubDetails;
