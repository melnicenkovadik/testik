/**
 * Copyright 2018 Ambrosus Inc.
 * Email: tech@ambrosus.com
 */
import React, {Fragment, useEffect} from 'react';
import './AssetDetails.scss';
import TableRow from '../../components/TableRow';
import SubDetails from './SubDetails';
import CustomData from './CustomData';
import Item from '../../components/Item';


const AssetDetails = ({asset}) => {
    return (
        <Fragment>
            <Item title='Asset Details'>
                <Fragment>
                    <div className='table'>
                        <TableRow title='Name' value={asset.info.name}/>
                        {asset?.info?.properties.map(({key, value}, index) => (
                            <TableRow key={index} title={key} value={value}/>
                        ))}
                    </div>
                    <SubDetails asset={asset.info.groups}/>
                    <CustomData asset={asset}/>
                </Fragment>
            </Item>
        </Fragment>
    );
};

export default AssetDetails;
