/**
 * Copyright 2018 Ambrosus Inc.
 * Email: tech@ambrosus.com
 */
import React, { Component } from 'react';
import Event from './Event';
import './Timeline.scss';


export default class Timeline extends Component {
     state = {
        btnObj: {
            disabled: false,
            loading: false,
        },
    };

     loadEvent = async () => {
        const btnObj = {
            disabled: true,
            loading: true,
        };
        this.setState({ btnObj });
        const data = {
            disabled: false,
            loading: false,
        };
        this.setState({ btnObj: data });
    }

     renderEvents = () => {
        const { events, assetId } = this.props;
        return (
            <React.Fragment>
                {events.map((event, i) =>
                    <Event event={event} assetId={assetId} index={i} key={i} />)}
            </React.Fragment>
        );
    }

     noEvents = () => {
        return (
            <div className='noContent'>
                <p>No Events Available</p>
            </div>
        );
    }

     render() {
        const { events } = this.props;
        return (
            <div className='item__events Timeline'>
                <h2 className='table-title '>All Events</h2>
                {events.length ? this.renderEvents() : this.noEvents()}
            </div>
        );
    }
}
