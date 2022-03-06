import * as alt from 'alt-server';

import { SYSTEM_EVENTS } from '../../../../shared/enums/system';
import { Vehicle_Behavior } from '../../../../shared/enums/vehicle';
import { Vector3 } from '../../../../shared/interfaces/vector';
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
    private vehicles: Array<alt.Vehicle> = [];
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
    addVehicle(
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
        this.vehicles.push(veh);
        return veh;
    }

    /**
     * Remove all vehicles from this job.
     * @memberof Rent
     */
    removeAllVehicles() {
        for (let i = 0; i < this.vehicles.length; i++) {
            try {
                this.vehicles[i].destroy();
            } catch (err) {}
        }
    }

    /**
     * Remove a vehicle by unique identifier assigned when adding a vehicle.
     * @param {string} uid
     * @return {*}
     * @memberof Rent
     */
    removeVehicle(uid: string) {
        for (let i = this.vehicles.length - 1; i >= 0; i--) {
            if (this.vehicles[i].uid !== uid) {
                continue;
            }

            this.vehicles.splice(i, 1);
            return;
        }
    }    }

    