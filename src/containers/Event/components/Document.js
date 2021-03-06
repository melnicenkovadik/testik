import React, {Fragment} from 'react';
import './Document.scss';
import Item from '../../../components/Item';
import {getStyles} from '../../../utils';


const Document = ({event}) => {
    return (
        <Fragment>
            {event.documents &&
            <Item style={{backgroundColor: '#fff'}} title='Event Documents'>
                {Object.entries(event.documents).map(([key, value]) => {
                    return (
                        <div key={key}>
                            <h3 className='table-subtitle' style={getStyles('components_subtitles')}>{key}</h3>
                            {/*<div className='table'>*/}
                            {/*  {*/}
                            {/*    Object.entries(value).map(([k, v]) => (*/}
                            {/*      <TableRow title={k} key={k} value={v} />*/}
                            {/*    ))*/}
                            {/*  }*/}
                            {/*</div>*/}
                        </div>
                    );
                })}
            </Item>
            }
        </Fragment>
    );
};

export default Document;
