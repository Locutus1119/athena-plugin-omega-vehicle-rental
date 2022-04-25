import * as alt from 'alt-server';
import Logger from '../../../../server/utility/athenaLogger';
import { OVRS_TRANSLATIONS } from '../index';
import { playerFuncs } from '../../../../server/extensions/extPlayer';
import { Athena } from '../../../../server/api/athena';
import { CurrencyTypes } from '../../../../shared/enums/currency';
import { MessageEmbed } from 'discord.js';
import { DiscordController } from '../../../../server/systems/discord';
import { rentLOGChannel } from "../../../admin-Panel/server/src/discord-ch";
import {printTimestamp} from "../../../admin-Panel/server/src/timeStamp";
const discordChannel = rentLOGChannel;

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
        Athena.player.emit.notification(player, OVRS_TRANSLATIONS.notEnoughCash);
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
    Athena.player.emit.createSpinner(player, { duration: rentTime, text:   `Autobérlés` });
    Athena.player.currency.sub(player, CurrencyTypes.CASH, rentPrice);
    Athena.player.emit.notification(player, `${OVRS_TRANSLATIONS.rentStart} ${rentVeh} `);
    Logger.info(`${printTimestamp()}(${player.data.name}) has rented a Vehicle - Model: ${rentVeh} Position: ${player.pos}`);
    DiscordController.sendToChannel(discordChannel,`${printTimestamp()}(${player.data.name}) has rented a Vehicle - Model: ${rentVeh} Position: ${player.pos}`);
    
    alt.setTimeout(() => {
        const allVehicles = alt.Vehicle.all;
        allVehicles.forEach((vehicle) => {
            if(player.valid && player) {
                if(vehicle.getStreamSyncedMeta('Rented-Vehicle') === player.data.name) {
                    vehicle.destroy();
                    alt.log("Destroyed an Owned Vehicle.");
                    Logger.info(`${printTimestamp()}(${player.data.name}) has rented a Destroyed - Model: ${rentVeh}`);
                    DiscordController.sendToChannel(discordChannel,`${printTimestamp()}(${player.data.name}) has rented a Destroyed - Model: ${rentVeh}`);
                }
            } else {
                if(vehicle.getStreamSyncedMeta('IsRentVehicle') === true) {
                    vehicle.destroy();
                    alt.log("Destroyed an Unowned Vehicle.");
                    Logger.info(`${printTimestamp()}(${player.data.name}) has rented Destroyed an Unowned Vehicle.- Model: ${rentVeh}`);
                    DiscordController.sendToChannel(discordChannel,`${printTimestamp()}(${player.data.name}) has rented a Destroyed - Model: ${rentVeh}`);
                }
            }
        });
        alt.log("Timeout fired.");
        player.setMeta("isRenting", false);
        Logger.info(`${printTimestamp()} (${player.data.name}) Timeout fired.- Model: ${rentVeh}`);
        DiscordController.sendToChannel(discordChannel,`${printTimestamp()} (${player.data.name}) Timeout fired.- Model: ${rentVeh}`);
    }, rentTime);
    alt.log(JSON.stringify(`rentTime ${rentTime}`));
}});


