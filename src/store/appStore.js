import {makeAutoObservable} from "mobx";

class AppStore {
    assetId = '';
    eventId = '';
    hermesId='';

    constructor() {
        makeAutoObservable(this)
    }

    setAssetId(assetId) {
        this.assetId = assetId;
    }

    setEventId(eventId) {
        this.eventId = eventId;
    }
    setHermesId(hermesId) {
        this.hermesId = hermesId;
    }

    getAssetId() {
        return this.assetId;
    }

    getEventId() {
        return this.eventId;
    }
    getHermesId() {
        return this.hermesId;
    }
}

export default new AppStore()
