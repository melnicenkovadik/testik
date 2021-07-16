/**
 * Copyright 2018 Ambrosus Inc.
 * Email: tech@ambrosus.com
 */
import config from '../config';

class StorageService {
    namespace = config.NAMESPACE;
    storage = localStorage;

    set(key, value) {
        this.storage.setItem(`${this.namespace}${key}`, JSON.stringify(value));
    }

    put(key, value) {
        if (!this.get(key)) {
            this.storage.setItem(`${this.namespace}${key}`, JSON.stringify(value));
        } else {
            return false;
        }
    }

    get(key) {
        const value = this.storage.getItem(`${this.namespace}${key}`);
        try {
            return JSON.parse(value);
        } catch (err) {
            return value;
        }
    }

    delete(key) {
        this.storage.removeItem(`${this.namespace}${key}`);
    }

    clear() {
        const items = {...this.storage};
        Object.keys(items).map((value) => {
            if (value.indexOf(this.namespace) > -1) {
                this.delete(value.split(this.namespace)[1]);
            }
        });
    }
}

const storageService = new StorageService();
export default storageService;
