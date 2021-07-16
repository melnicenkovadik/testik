/**
 * Copyright 2018 Ambrosus Inc.
 * Email: tech@ambrosus.com
 */
import {StorageService} from '.';
import ambrosusSdk from 'ambrosus-javascript-sdk';
import {apiInstance} from '../utils';
import * as defaultConfig from '../config';

export class AssetService {
    config;

    constructor(config) {
        this.config = config;
    }

    async getAllHermeses() {
        const explorerUrl = this.config.EXPLORER_URL;
        try {
            const response = await apiInstance.getRequest(`${explorerUrl}/hermeses`);
            if (response.status === 200) {
                return response.data;
            }
        } catch {
        }
    }

    async getHermesesUrls() {
        try {
            const hermeses = await this.getAllHermeses();
            const hermesUrls = [];
            for (const hermes of hermeses.data) {
                hermesUrls.push(hermes['url']);
            }
            return hermesUrls;
        } catch (e) {
            const hermeses = await this.getAllHermeses();
            const hermesUrls = [];
            for (const hermes of hermeses.data) {
                hermesUrls.push(hermes['url']);
            }
            return hermesUrls;
        }

    }

    async fetchAll(hermeses, Id, type) {
        const promises = [];
        for (const hermes of hermeses) {
            const getUrl = `${hermes}/${type}/${Id}`;
            promises.push(
                new Promise(async (resolve, reject) => {
                    try {
                        const response = await apiInstance.getRequest(getUrl);
                        if (response.status === 200) {
                            if (type === 'events') {
                                resolve({url: hermes, event: response.data});
                            }
                            resolve({url: hermes, asset: response.data});
                        }
                    } catch (e) {
                        console.log(e);
                    }
                    reject();
                })
            );
        }
        let ret_val;
        await Promise.any(promises).then(async (fulfilled) => ret_val = fulfilled);
        return ret_val;
    }

    // async findAssetOnAllHermeses(assetId) {
    //     const hermeses = await this.getHermesesUrls();
    //     const res = await this.fetchAll(hermeses, assetId, 'assets');
    //     if (res) {
    //         return res;
    //     }
    //     throw new Error('No Asset');
    // }
    //
    // async findEventOnAllHermeses(eventId) {
    //     const hermeses = await this.getHermesesUrls();
    //     const res = await this.fetchAll(hermeses, eventId, 'events');
    //     if (res) {
    //         return res;
    //     }
    //     throw new Error('No Event');
    // }

    async addInfoToAsset(asset, url) {
        try {
            const infoEvent = (await this.getEvents(asset.assetId, url)).info;
            return {
                ...asset,
                info: infoEvent || {name: 'Unknown asset'},
            };
        } catch {
            return {
                ...asset,
                info: {name: 'Unknown asset'},
            };
        }
    }

    async getAsset(assetId, hermesId) {
        try {
            const getUrl = `${hermesId}/assets/${assetId}`;
            return await fetch(getUrl)
                .then((response) => {
                    return response.json();
                })
                .then(async (asset) => {
                    const assetWithInfo = await this.addInfoToAsset(asset, hermesId);
                    this.addHistory(assetWithInfo.info.name || '', assetId);
                    ambrosusSdk.utils.parseAsset(assetWithInfo);
                    return assetWithInfo;
                })

        } catch (e) {
            console.log(e);
        }

    }

    async getBranding(assetId, hermesUrl) {
        return {};
    }

    async getEvent(hermesId, assetId, eventId) {
        try {
            const getUrl = `${hermesId}/assets/${assetId}/events/`;
            return await fetch(getUrl)
                .then((response) => {
                    return response.json();
                })
                .then((event) => {
                    // console.log('event', event.results.filter(item => {
                    //     return item.eventId === eventId
                    // }))
                    return event.results.filter(item => {
                        return item.eventId === eventId
                    })
                })

        } catch (e) {
            console.log(e);
        }
    }

    async getEvents(assetId, hermesUrl) {
        const eventsResponse = await apiInstance.getRequest(`${hermesUrl}/assets/${assetId}/events`);
        if (eventsResponse.status !== 200 || !eventsResponse.data || !eventsResponse.data.results) {
            throw new Error('Wrong events request');
        }
        const data = {
            results: [...eventsResponse.data.results],
        };
        const parsedEvents = ambrosusSdk.utils.parseEvents(data);
        parsedEvents.events.sort(
            ambrosusSdk.utils.sortEventsByTimestamp
        );
        return parsedEvents;
    }

    addHistory(title, assetId) {
        const history = {title, id: assetId};
        const tempHistory = StorageService.get('history');
        if (tempHistory && tempHistory.length > 0) {
            const newHistory = tempHistory.filter((e) => e.id !== assetId);
            newHistory.unshift(history);
            StorageService.set('history', newHistory);
        } else {
            StorageService.set('history', [history]);
        }
    }
}

const assetService = new AssetService(defaultConfig.default);
export default assetService;
