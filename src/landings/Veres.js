import React, {useEffect, useState} from 'react';
import '../components/Asset.scss';
import {Slideshow} from '../components/Slider';

import xIcon from '../assets/landing/X.svg';
import {AssetService} from '../services'
import veresLogo from '../assets/landing/veres/VERES_LOGO-242x136.svg';
import beaLogo from '../assets/landing/veres/BEA-LOGO.svg';
import ambLogo from '../assets/landing/veres/amb_logo_wt.svg';

import background from '../assets/landing/background.svg';

import veres1 from '../assets/landing/veres/slider/0031.jpg';
import veres2 from '../assets/landing/veres/slider/IMG_1532.jpg';
import veres3 from '../assets/landing/veres/slider/IMG_1740.jpg';
import veres4 from '../assets/landing/veres/slider/0083.jpg';
import {getStyles} from "../utils";
import Loader from "../components/Loader";
import {AssetDetails, Timeline} from "./components";
import appStore from "../store/appStore";

const Veres = ({assetIdProp, hermesIdProp}) => {
    const [asset, setAsset] = useState(null);
    const [events, setEvents] = useState(null);

    useEffect(async () => {
        appStore.setAssetId(assetIdProp)
        appStore.setHermesId(hermesIdProp)

        async function fetchMyData() {
            try {
                new Promise(async (resolve, reject) => {
                    await AssetService.getAsset(assetIdProp, hermesIdProp)
                        .then(asset => {
                            resolve(setAsset(asset))
                        }).catch(error => console.error(error));
                    await AssetService.getEvents(assetIdProp, hermesIdProp)
                        .then(events => {
                            resolve(setEvents(events))
                        }).catch(error => console.error(error));
                })
            } catch (e) {
                console.log(e);
            }

        }

        await fetchMyData()
        return () => fetchMyData
    }, [])
    return (
        <>
            <div className='Info'>
                <div className='item' style={getStyles('content')}>
                    <div className={'item__header'}>
                        <div className='item__header--item'><img alt='icon' src={veresLogo}/></div>
                        <div className='item__header--item hide-mobile'><img alt='icon' src={xIcon}/></div>
                        <div className='item__header--item'><img alt='icon' src={beaLogo}/></div>
                        <div className='item__header--item hide-mobile'><img alt='icon' src={xIcon}/></div>
                        <div className='item__header--item '>
                            <img alt='icon' src={ambLogo}/>
                        </div>
                        <img style={{zIndex: 1}} className={'item__header--background'} src={background}
                             alt='wrap'/>
                    </div>
                    <div className='wrapper'>
                        <div className='item__container'>
                            <div className={'item__container__top'}>
                                <div className={'item__container__top-heading'}>
                                    Ambrosus Ecosystem has partnered with Business Engineers Asia to support the
                                    Ukraine
                                    30@SG
                                    initiative to
                                    help 30 FMCG
                                    Ukrainian brands enter the Singapore retail market. Ambrosus will be providing
                                    and
                                    storing proof
                                    of
                                    origins and supply
                                    chain traceability for all brands on AMB-NET. VERES, a leading Ukrainian
                                    manufacturer of canned
                                    fruit,
                                    and vegetable production,
                                    became our first mutual partner. All information on VERES batches that are sent
                                    to
                                    Singapore will
                                    be
                                    securely stored on our blockchain, for anyone to access updates on provenance,
                                    certification, and
                                    more.
                                </div>
                            </div>

                            <div className={'item__container__about'}>
                                <div className={'item__container__about--info'}>
                                    <div className={'first'}>
                                        <h2 className={'first__heading'}>about brand</h2>
                                        <p className={'first__secondary'}>
                                            VERES is a well-known Ukrainian food brand with over 20 years of
                                            expertise
                                            in
                                            growing vegetables and canned fruit and vegetable production. The
                                            company
                                            owns 7000ha
                                            of agro-industrial land across Ukraine and has three full-cycle
                                            production
                                            sites, setting food
                                            trends for maintaining health and comfort living.
                                        </p>
                                        <a
                                            className={'first__link'}
                                            target={'_blank'}
                                            rel="noreferrer"
                                            href='https://www.veresfood.com/en '>
                                            https://www.veresfood.com/en
                                        </a>
                                    </div>
                                    <div
                                        style={{padding: 20}}
                                        className={'second'}>
                                        <img alt='icon' src={veresLogo}/>
                                    </div>
                                </div>
                                <div className={'item__container__about--slider'}>
                                    <Slideshow images={[veres1,
                                        veres2,
                                        veres3,
                                        veres4]}/>
                                </div>

                            </div>
                            <div className={'item__container__blockchain-data'}>
                                <h2 className={'item__container__blockchain-data--heading'}>BLOCKCHAIN DATA</h2>
                            </div>
                            {
                                !(asset && events) && <div style={{margin: 20}}><Loader/></div>
                            }
                            <div className={'asset-block'}>
                                {
                                    asset?.info && <div className={'asset-details-block'}>
                                        <AssetDetails asset={asset}/></div>

                                }
                                <div className={'event-details-block'}>
                                    {events && (
                                        <div className='item__container'>
                                            <Timeline events={events.events}
                                                      assetId={asset.assetId}/>
                                        </div>
                                    )}
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Veres;
