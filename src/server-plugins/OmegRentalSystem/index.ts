import * as alt from 'alt-server';
import { PluginSystem } from '../../server/systems/plugins';

import './src/controller';
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
    notEnoughCash = 'Not enough cash.',
    rentStart = `You've rented a vehicle.`,
}

PluginSystem.registerPlugin(OVRS.name, async () => {
    alt.log(`~lg~${OVRS.name} ${OVRS.version} successfully loaded.`);
    await Database.createCollection(OVRS.collection);
});
