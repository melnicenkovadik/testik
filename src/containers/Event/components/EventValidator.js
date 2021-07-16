import React from 'react';
import './EventValidator.scss';
import Item from '../../../components/Item';

const EventValidator = ({eventId}) => {
    return (
        <Item>
            <div className='table'>
                <div className='table-row'>
                    <div className='table-cell--title'>Check Event Validation</div>
                    <div className='event-details-json table-cell'>
                        <a href={`https://ambrosus.github.io/app-checker/?eventId=${eventId}`} target='_blank'
                           rel='noopener noreferrer'>Click Here</a>
                    </div>
                </div>
            </div>
        </Item>
    );
};

export default EventValidator;
