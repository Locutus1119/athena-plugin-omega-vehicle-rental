import * as alt from 'alt-server';
import Database from '@stuyk/ezmongodb';
import IRent from './interfaces/IRent';
import { PedController } from '../../../../server/streamers/ped';
import { OVRS, OVRS_TRANSLATIONS } from '../index';
import { InteractionController } from '../../../../server/systems/interaction';
import { ServerBlipController } from '../../../../server/systems/blip';
import { SYSTEM_EVENTS } from '../../../../shared/enums/system';
import { RentRegistry } from './rentRegistry';
import { deepCloneObject } from '../../../../shared/utility/deepCopy';
import { Vector3 } from 'alt-shared';
import { Athena } from '../../../../server/api/athena';
import { ServerMarkerController } from '../../../../server/streamers/marker';
import { MARKER_TYPE } from '../../../../shared/enums/markerTypes';

const PAGENAME = 'RentUI';

alt.on(SYSTEM_EVENTS.BOOTUP_ENABLE_ENTRY, async () => {
    RentRegistry.forEach(async (rent, index) => {
        let dbRent: IRent = await Database.fetchAllByField<IRent>('dbName', rent.dbName, OVRS.collection)[0];
        if (!dbRent) {
            dbRent = deepCloneObject(rent);
        }

        if (!dbRent._id) {
            await Database.insertData(dbRent, OVRS.collection, false);
        } else {
            await Database.updatePartialData(dbRent._id, dbRent, OVRS.collection);
        }

        for (let i = 0; i < dbRent.locations.length; i++) {
            let location = dbRent.locations[i];
            if (location.isBlip) {
                ServerBlipController.append({
                    pos: new alt.Vector3(location.x, location.y, location.z),
                    shortRange: true,
                    sprite: dbRent.blipSprite,
                    color: dbRent.blipColor,
                    text: dbRent.name,
                    scale: dbRent.blipScale,
                    uid: `Rent-${dbRent.dbName}-${i}`,
                });
                ServerMarkerController.append({
                    pos: new alt.Vector3(location.x, location.y, location.z),
                    color: new alt.RGBA(255, 255, 255, 150),
                    type: MARKER_TYPE.CAR,
                    scale: new alt.Vector3(1, 1, 1),
                });
            }
            let isPed = location.ped;
            if (isPed) {
                PedController.append({
                    model: location.ped.model,
                    pos: location.ped.pos,
                    heading: location.ped.heading,
                    maxDistance: 100,
                    animations: location.ped.animations,
                    dimension: 0,
                    uid: `PED-${dbRent.dbName}-${i}`,
                });
            }
            const outPos = new alt.Vector3(location.x2, location.y2, location.z2);
            const outRot = new alt.Vector3(location.x2r, location.y2r, location.z2r);
            Athena.controllers.interaction.add({
                position: new alt.Vector3(location.x, location.y, location.z),
                description: OVRS_TRANSLATIONS.openRent,
                range: dbRent.interactionRange ? dbRent.interactionRange : OVRS.interactionRange,
                uid: `IC-${dbRent.dbName}-${i}`,
                debug: false,
                callback: (player: alt.Player) => {
                    initRentCallback(player, dbRent, outPos, outRot);
                },
            });
        }
    });
});

async function initRentCallback(player: alt.Player, rent: IRent, outPos: Vector3, outRot: Vector3) {
    let currentRent = rent;
    let dbRent: IRent = await Database.fetchAllByField<IRent>('dbName', rent.dbName, OVRS.collection)[0];
    if (dbRent) {
        currentRent = dbRent;
    }
    let dataVehicles = [];
    for (const vehicle of currentRent.data.vehicles) {
        dataVehicles.push({
            name: vehicle.name,
            price: vehicle.price,
            modelName: vehicle.modelName,
            image: vehicle.image,
            outPos: outPos,
            outRot: outRot,
        });
        // alt.log(
        //     `Pushed RENT Data => ${vehicle.modelName} ${vehicle.price} ${vehicle.name} ${vehicle.image} ${outPos} ${outRot}`,
        // );
        // alt.log(
        //     `Probe RENT Data => ${dataVehicles} `,
        // );
    }

    alt.emitClient(player, `${PAGENAME}:Client:OpenRent`, dataVehicles);
}
