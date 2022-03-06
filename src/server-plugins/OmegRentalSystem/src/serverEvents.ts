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
import { ServerMarkerController } from '../../../server/streamers/marker';
import { ServerBlipController } from '../../../server/systems/blip';
import { InteractionController } from '../../../server/systems/interaction';
import { MARKER_TYPE } from '../../../shared/enums/markerTypes';
//import {Rent} from '../src/system/rent'
import { SYSTEM_EVENTS } from '../../../shared/enums/system';
import { Vehicle_Behavior } from '../../../shared/enums/vehicle';
import { sha256Random } from '../../../server/utility/encryption';
import { Objective } from '../../../shared/interfaces/job';
import { Job } from '../../../server/systems/job';
import JobEnums from '../../../shared/interfaces/job';


import Logger from '../../../server/utility/athenaLogger';
import { MessageEmbed } from 'discord.js';
import { DiscordController } from '../../../server/systems/discord';
import { rentLOGChannel } from "../../Admin-Panel/src/discord-ch";
import { Vector3 } from 'alt-shared';
import vehicle from '../../../client/extensions/vehicle';
const discordChannel = rentLOGChannel;


const PAGENAME = 'RentUI';

alt.onClient(
    `${PAGENAME}:Server:HandleRent`,
    async (player: alt.Player, rentVehicle: any, amount: number,) => {
            const rentVeh = rentVehicle.modelName;
            const rentOutPos = rentVehicle.outPos;
            const rentOutRot = rentVehicle.outRot;
            const rentEndPos = rentVehicle.endPos;
            const rentPrice = rentVehicle.price * amount
            const rentTime = amount * 60000;
            const Test = new alt.ColshapeSphere(rentVehicle.outPos.x, rentVehicle.outPos.y, rentVehicle.outPos.z - 1, 2);
            const rentUid = `Rent-${player.id}-${rentVeh}`
            alt.log(JSON.stringify(`pointTest ${Test}`));
            alt.log(JSON.stringify(`rentEndPos ${rentEndPos}`));
            alt.log(JSON.stringify(`rentTime ${rentTime}`));


            
                Rent.addVehicle(
                player,
                rentVeh,
                rentUid,
                rentOutPos,
                rentOutRot,
                { r: 253, g: 184, b: 19, a: 1 },
                { r: 253, g: 184, b: 19, a: 1 },
            );
   
                ServerBlipController.append({
                    sprite: 198,
                    color: 5,
                    pos: rentEndPos,
                    scale: 1,
                    shortRange: true,
                    text: 'Bérautó leadása',
                });
        
                ServerMarkerController.append({
                    pos: rentEndPos,
                    color: new alt.RGBA(255, 255, 255, 150),
                    type: MARKER_TYPE.CYLINDER,
                    scale: new alt.Vector3(2, 2, 2),
                });
                InteractionController.add({
                    uid: `Rent-${player.id-rentVeh}`,
                    position: rentEndPos,
                    description: 'Rent End Point',
                    isPlayerOnly: false,
                    //callback:  ???
                   

                });
                
                

            playerFuncs.currency.sub(player, CurrencyTypes.CASH, rentPrice);
            playerFuncs.emit.notification(player, `${OVRS_TRANSLATIONS.rentStart} ${rentVeh} `);
        Logger.info(`(${player.data.name}) kibérelt egy ${rentVeh} itt: ${player.pos}`);
                        DiscordController.sendToChannel(discordChannel,`(${player.data.name}) kibérelt egy ${rentVeh} itt: ${player.pos}`);


    }
    );


 export class Rent {
    /**
     * The ID of the player.
     * @private
     * @type {number}
     * @memberof Rent
     */
    private id: number;
    private player: alt.Player;
    static vehicles: alt.Vehicle;
    private startTime: number;
   

    /**
     * Creates an instance of a Rent handler.
     * Used to build a Rent for usage.
     * This instance should be called each time to create new Rent instances.
     * @memberof Rent
     */
    constructor() {}



    /**
     * Create a unique vehicle for this Rent.
     * Objective eventually removes the Rent vehicle.
     * This unique job vehicle is temporarily assinged to the player.
     *
     * Returns a vehicle with a 'uid'.
     *
     * @param {string} model
     * @param {alt.RGBA} [color1]
     * @param {alt.RGBA} [color2]
     * @return {alt.Vehicle}
     * @memberof Rent
     */
    static addVehicle(
        player: alt.Player,
        model: string,
        uid: string,
        pos: Vector3,
        rot: Vector3,
        color1?: alt.RGBA,
        color2?: alt.RGBA,
    ): alt.Vehicle {
        //const uid = sha256Random(JSON.stringify(player.data));
        const veh = new alt.Vehicle(model, pos.x, pos.y, pos.z, rot.x, rot.y, rot.z);
        veh.uid = uid;

        if (!color1) {
            color1 = new alt.RGBA(255, 255, 255, 255);
        }

        if (!color2) {
            color2 = new alt.RGBA(255, 255, 255, 255);
        }

        veh.player_id = player.id;
        veh.customPrimaryColor = color1;
        veh.customSecondaryColor = color2;
        veh.behavior = Vehicle_Behavior.UNLIMITED_FUEL | Vehicle_Behavior.NO_SAVE;
        return veh;
    }    }
