import * as alt from 'alt-server';
import Database from '@stuyk/ezmongodb';
import { OVRS_TRANSLATIONS } from '../index';
import { playerFuncs } from '../../../server/extensions/extPlayer';
import { CurrencyTypes } from '../../../shared/enums/currency';
import { LocaleController } from '../../../shared/locale/locale';
import { LOCALE_KEYS } from '../../../shared/locale/languages/keys';
import VehicleFuncs from '../../../server/extensions/vehicleFuncs';
import {IRentLocation} from '../src/interfaces/IRent';
import { OVRS } from '../index';

import Logger from '../../../server/utility/athenaLogger';
import { MessageEmbed } from 'discord.js';
import { DiscordController } from '../../../server/systems/discord';
import { shopLOGChannel } from "../../Admin-Panel/src/discord-ch";
import { Vector3 } from 'alt-shared';
const discordChannel = shopLOGChannel;

const PAGENAME = 'RentUI';
alt.onClient(
    `${PAGENAME}:Server:HandleRent`,
    async (player: alt.Player, rentVehicle: any, amount: number,) => {
            const rentVeh = rentVehicle.modelName;
            const rentOutPos = rentVehicle.outPos;
            const rentOutRot = rentVehicle.outRot;
            const rentPrice = rentVehicle.price * amount
            
    playerFuncs.currency.sub(player, CurrencyTypes.CASH, rentPrice);
    try {
        VehicleFuncs.rentVehicle(player, rentVeh, rentOutPos, rentOutRot,);
    } catch (err) {
        playerFuncs.emit.message(player, LocaleController.get(LOCALE_KEYS.INVALID_VEHICLE_MODEL));
    }
        })
        