import * as alt from 'alt-server';
import Logger from '../../../server/utility/athenaLogger';
import { OVRS_TRANSLATIONS } from '../index';
import { playerFuncs } from '../../../server/extensions/extPlayer';
import { CurrencyTypes } from '../../../shared/enums/currency';

import Rent from './controller';

const PAGENAME = 'RentUI';

alt.onClient(`${PAGENAME}:Server:HandleRent`, async (player: alt.Player, rentVehicle: any, amount: number) => {
    const rentVeh = rentVehicle.modelName;
    const rentOutPos = rentVehicle.outPos;
    const rentOutRot = rentVehicle.outRot;
    const rentPrice = rentVehicle.price * amount;
    const rentTime = amount * 60000;
    const rentUid = `Rent-${player.id}-${rentVeh}`;

    if (rentPrice > player.data.cash) {
        playerFuncs.emit.notification(player, OVRS_TRANSLATIONS.notEnoughCash);
        return;
    }

    //Pos szabad?

    if (!player.getMeta("isRenting") == true) {
        player.setMeta("isRenting", true);

    const rentedVehicle = Rent.addVehicle(
        player,
        rentVeh,
        rentUid,
        rentOutPos,
        rentOutRot,
        { r: 253, g: 184, b: 19, a: 1 },
        { r: 253, g: 184, b: 19, a: 1 },
    );

    rentedVehicle.setStreamSyncedMeta(`Rented-Vehicle`, player.data.name);
    rentedVehicle.setStreamSyncedMeta('IsRentVehicle', true);
    playerFuncs.emit.createSpinner(player, { duration: rentTime, text:   `Autobérlés` });
    playerFuncs.currency.sub(player, CurrencyTypes.CASH, rentPrice);
    playerFuncs.emit.notification(player, `${OVRS_TRANSLATIONS.rentStart} ${rentVeh} `);

    alt.setTimeout(() => {
        const allVehicles = alt.Vehicle.all;
        allVehicles.forEach((vehicle) => {
            if(player.valid && player) {
                if(vehicle.getStreamSyncedMeta('Rented-Vehicle') === player.data.name) {
                    vehicle.destroy();
                    alt.log("Destroyed an Owned Vehicle.");
                }
            } else {
                if(vehicle.getStreamSyncedMeta('IsRentVehicle') === true) {
                    vehicle.destroy();
                    alt.log("Destroyed an Unowned Vehicle.");
                }
            }
        });
        alt.log("Timeout fired.");
        player.setMeta("isRenting", false);
    }, rentTime);
}});
