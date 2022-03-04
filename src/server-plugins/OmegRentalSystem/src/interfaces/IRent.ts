import IRentListVehicle from './IRentList';
import { Animation } from '../../../../shared/interfaces/animation';
import alt from "alt-server";

export default interface IRent {
    _id?: string;
    name: string;
    dbName: string;
    shopImage?: string;
    blipShortRange?: boolean;
    blipSprite: number;
    blipColor: number;
    blipScale: number;
    interactionRange?: number;
    data: {
        vehicles?: IRentListVehicle[];
    };
    locations: IRentLocation[];
}

export interface IRentLocation {
    x: number;
    y: number;
    z: number;
    isBlip?: boolean; //Enable/Disable blip e.g. none for Vendors. Already defined from Athena in shared/information
    x2: number;
    y2: number;
    z2: number;
    x2r: number;
    y2r: number;
    z2r: number;
    
    ped?: {
        model: string;
        heading: number;
        pos: alt.Vector3;
        animations?: Animation[];
    }

}


