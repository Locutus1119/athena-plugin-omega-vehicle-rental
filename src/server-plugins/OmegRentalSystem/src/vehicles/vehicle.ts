import * as alt from 'alt-server';

import { SYSTEM_EVENTS } from '../../../../shared/enums/system';
import { Vehicle_Behavior } from '../../../../shared/enums/vehicle';
import JobEnums, { Objective } from '../../../../shared/interfaces/job';
import { Vector3 } from '../../../../shared/interfaces/vector';
import { deepCloneObject } from '../../../../shared/utility/deepCopy';
import { isFlagEnabled } from '../../../../shared/utility/flags';
import { distance, distance2d } from '../../../../shared/utility/vector';
import { playerFuncs } from '../../../../server/extensions/extPlayer';
import { sha256Random } from '../../../../server/utility/encryption';



export class Rent {
    /**
     * The ID of the player.
     * @private
     * @type {number}
     * @memberof Rent
     */
     private id: number;
     private player: alt.Player;
     private objectives: Array<Objective> = [];
     private vehicles: Array<alt.Vehicle> = [];
     private startTime: number;
 
     /**
      * Creates an instance of a job handler.
      * Used to build a Job for usage.
      * This instance should be called each time to create new job instances.
      * @memberof Rent
      */
     constructor() {}
/**
     * Create a unique vehicle for this job.
     * Objective eventually removes the job vehicle.
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
 addVehicle(
    player: alt.Player,
    model: string,
    pos: Vector3,
    rot: Vector3,
    plate: string,
    color1?: alt.RGBA,
    color2?: alt.RGBA,
): alt.Vehicle {
    const uid = sha256Random(JSON.stringify(player.data));
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
    veh.behavior = Vehicle_Behavior.CONSUMES_FUEL | Vehicle_Behavior.NO_SAVE;
    this.vehicles.push(veh);
    return veh;

}

}