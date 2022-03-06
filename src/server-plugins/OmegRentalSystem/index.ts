import * as alt from 'alt-server';
import { PluginSystem } from '../../server/systems/plugins';

import './src/serverEvents';
import './src/serverDatabase';
import Database from '@stuyk/ezmongodb';

export const OVRS = {
    name: 'OMEGAVehicleRentalSystem',
    version: 'v0.1',
    collection: 'rental',
    interactionRange: 2,

};

export enum OVRS_TRANSLATIONS {
    openRent = 'Open Rent',
    notEnoughCash = 'Nincs elég pénzed',
    rentStart = 'Kibéreltél egy ',

}

PluginSystem.registerPlugin(OVRS.name, async () => {
    alt.log(`~lg~${OVRS.name} ${OVRS.version} successfully loaded.`);
    await Database.createCollection(OVRS.collection);
});
