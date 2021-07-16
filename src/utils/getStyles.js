import convertStyles from './convertStyles';
import {AssetService} from "../services";

const getStyles = (key) => {
    let events = AssetService.getBranding('0x4efe2723f33387eede1b03cda4b410417cd3c15e88e8125047271489597711e5','https://hermes-bea0.bea-ambrosus.io')
    const brandings = events.branding || {};
    const fStyles = {};
    try {
        let styles = brandings[key] || {};
        styles = Object.keys(styles).map((item) => {
            let tk = item;
            if (item.indexOf('-') !== -1) {
                const firstPart = item.split('-')[0];
                const lastPart = item.split('-')[1];
                tk = firstPart + lastPart.charAt(0).toUpperCase() + lastPart.substring(1);
            }
            fStyles[tk] = styles[item];
            return;
        });
        return convertStyles(fStyles);
    } catch (error) {
        return {};
    }
};

export default getStyles;
