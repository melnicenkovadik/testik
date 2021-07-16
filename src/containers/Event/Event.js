import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import Preloader from '../../components/Preloader/Preloader';
import {getStyles} from '../../utils';
import './Event.scss';
import {AssetService} from "../../services";
import {Details, DisplayBar, Document, EventValidator, Location} from "./components";
import appStore from "../../store/appStore";
import {observer} from "mobx-react-lite";
// import {Details, DisplayBar, Document, EventValidator, Location} from './components';
const Event = observer((props) => {
    const [event, setEvent] = useState(null);
    let history = useHistory();
    const {eventId} = props.match.params;
    const getEventData = () => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(setEvent(await AssetService.getEvent(appStore.hermesId, appStore.assetId, eventId)));
            } catch (error) {
                reject(error);
            }
        });
    }
    useEffect(async () => {
        if (!(eventId && appStore.hermesId && appStore.assetId)) {
            history.push('/');
            return;
        }
        await getEventData()
    }, [])

    return (
        <div className='Event' style={getStyles('content')}>
            <div className='wrapper'>
                <Link className='back-button' to={`/`}>Back to Asset</Link>
                {
                    event ?
                        (
                            <>
                                <DisplayBar event={event[0].content.data[0]}/>
                                <div className='Event-container'>
                                    <div className='item__container'>
                                        <Details event={event[0].content}/>
                                        <Document event={event[0].content.idData}/>
                                        <EventValidator eventId={eventId}/>
                                    </div>
                                    <Location event={event[0]}/>
                                </div>
                            </>
                        )
                        :
                        <Preloader/>
                }

            </div>
        </div>
    );
})

export default Event
