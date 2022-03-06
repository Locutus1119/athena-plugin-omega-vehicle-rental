import * as alt from 'alt-server';
import { Vehicle_Behavior } from '../../../shared/enums/vehicle';
let vehicles: Array<alt.Vehicle> = [];

export default class Rent {
    public static addVehicle(
        player: alt.Player,
        model: string,
        uid: string,
        pos: alt.Vector3,
        rot: alt.Vector3,
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
        vehicles.push(veh);
        return veh;
    }
}
