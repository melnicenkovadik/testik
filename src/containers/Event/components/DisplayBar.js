import React from 'react';
import './DisplayBar.scss';
import {assetDetails, timeSince} from '../../../utils';
import pinIcon from '../../../assets/svg/pin.svg';


const DisplayBar = ({event}) => {

    const eventTypeToStyle = (value) => {
        if (assetDetails[value] === undefined) {
            return assetDetails['default'];
        }
        return assetDetails[value];
    };
    return (
        <>
            {
                event.name &&
                (<div className='DisplayBar' style={{'backgroundColor': eventTypeToStyle(event.type).backgroundColor}}>
                    <img width={37} src={eventTypeToStyle(event.type).iconUrl} alt={'icon'} className='bar__image'/>
                    <div className='bar__copy'>
                        <div className='bar__container'>
                            <h4 className='bar__heading'>{event.name}</h4>
                        </div>
                        <div className='bar__container'>
                            {event.timestamp && <p className='bar__time'>{timeSince(event.timestamp * 1000)} ago</p>}
                            {event.location && <img alt={'icon'} src={pinIcon} className='bar__place--icon'/>}
                            {event.location && <p className='bar__place'>{event.location.name}</p>}
                        </div>
                    </div>
                </div>)
            }
        </>


    );
};

export default DisplayBar;
