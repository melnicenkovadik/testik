/**
 * Copyright 2018 Ambrosus Inc.
 * Email: tech@ambrosus.com
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Maps from '../../components/Maps';
import pinLogo from '../../assets/svg/pin.svg';
import {assetDetails, formatDate, locationExists, timeSince} from '../../utils';

import './Event.scss';
import TableRow from '../../components/TableRow';

export default class Event extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expandEvent: false,
        };
    }

    eventTypeToStyle(value) {
        if (assetDetails[value] === undefined) {
            return assetDetails['default'];
        }
        return assetDetails[value];
    }

    expandEvent = () => {
        this.setState({
            expandEvent: !this.state.expandEvent,
        });
    }

    render() {
        const {event} = this.props;
        const eventAsset = this.eventTypeToStyle(event.type);
        return (
            <div id={event.eventId} className='item__event__container'>
                <div className='item__event__timeline '>
                    <h5 className='item__event__timeline__heading '>{event.type}</h5>
                    <div className='item__event__timeline__dot'/>
                    <p className='item__event__timeline__date '>
                        {formatDate(event.timestamp * 1000, true)}
                    </p>
                </div>

                <div
                    className={
                        this.state.expandEvent
                            ? 'item__event__button--active'
                            : 'item__event__button'
                    }
                >
                    <div
                        onClick={this.expandEvent}
                        className='item__event__single'
                        style={{backgroundColor: eventAsset.backgroundColor}}
                    >
                        {
                            event.location ?
                                (
                                    <div className='item__event__single__image'>
                                        <img alt={'icon'} src={eventAsset.iconUrl}/>
                                    </div>
                                )
                                :
                                (
                                    <div className='item__event__single__image'>
                                    </div>
                                )
                        }


                        <div className='item__event__single__copy '>
                            <div className='item__event__single__container '>
                                <h4 className='item__event__single__heading '>{event.name}</h4>
                            </div>
                            <div className='item__event__single__container '>
                                <p className='item__event__single__time '>
                                    {timeSince(event.timestamp * 1000)} ago
                                </p>
                                {event.location && (
                                    <div className='item__event__single__place-container'>
                                        <img
                                            alt={'GEO'}
                                            width={26}
                                            src={pinLogo}
                                            className='item__event__single__place--icon '
                                        />
                                        {event.location.city || event.location.country ? (
                                            <p className='item__event__single__place'>
                                                {event.location.city && event.location.city}
                                                {event.location.country &&
                                                `, ${event.location.country}`}
                                            </p>
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div
                        className={
                            this.state.expandEvent
                                ? 'item__event__more-details item__event__more-details--active'
                                : 'item__event__more-details item__event__more-details'
                        }
                    >
                        {locationExists(event) && (
                            <Maps
                                containerElement={<div className='item-map'/>}
                                loadingElement={<div style={{height: `100%`}}/>}
                                mapElement={<div style={{height: `100%`}}/>}
                                lat={event.location.location.geometry.coordinates[0]}
                                lng={event.location.location.geometry.coordinates[1]}
                            />
                        )}
                        <TableRow
                            title='AMB-id'
                            value={event.eventId}
                            rowClass={['item__event__more-details__row']}
                            cellClass={['item__event__more-details__cell']}
                            titleClass={['item__event__more-details__cell--title']}
                        />

                        <TableRow
                            title='Timestamp'
                            value={formatDate(event.timestamp * 1000, true)}
                            rowClass={['item__event__more-details__row']}
                            cellClass={['item__event__more-details__cell']}
                            titleClass={['item__event__more-details__cell--title']}
                        />

                        <TableRow
                            title='Created by'
                            value={event.author}
                            rowClass={['item__event__more-details__row']}
                            cellClass={['item__event__more-details__cell']}
                            titleClass={['item__event__more-details__cell--title']}
                        />
                        {
                            event && event.raws && event.raws.length ?
                                <TableRow
                                    title='Files'
                                    value={event.raws}
                                    smallImages={true}
                                    rowClass={['item__event__more-details__row']}
                                    cellClass={['item__event__more-details__cell']}
                                    titleClass={['item__event__more-details__cell--title']}
                                />
                                : null
                        }

                        <div className='item__event__more-details__row '>
                            <Link
                                className='item__event__more-details__button'
                                to={{
                                    pathname: `/events/${event.eventId}`,
                                }}
                            >
                                VIEW EVENT DETAILS...
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
