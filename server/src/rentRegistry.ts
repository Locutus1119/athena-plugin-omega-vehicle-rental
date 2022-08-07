import IRent from './interfaces/IRent';
import { baseRentLocations } from './rentLists/baseRent';
import { cyclesRentLocations } from './rentLists/cyclesRent';
import { escaleraRentLocations } from './rentLists/escaleraRent';

export const RentRegistry: Array<IRent> = [
    {
        name: 'Base Rent',
        dbName: 'Base-Rent',
        blipSprite: 227,
        blipColor: 38,
        blipScale: 1,
        data: {
            vehicles: [
                { name: 'Sentinel', price: 75, modelName: 'sentinel', image: 'sentinel' },
                { name: 'F620', price: 375, modelName: 'f620', image: 'f620' },
                { name: 'Dubsta', price: 250, modelName: 'dubsta', image: 'dubsta' },
                { name: 'Zion', price: 250, modelName: 'zion', image: 'zion' },
                { name: 'Club', price: 300, modelName: 'club', image: 'club' },
                { name: 'Patriot', price: 350, modelName: 'patriot', image: 'patriot' },
                { name: 'Tailgater', price: 400, modelName: 'tailgater', image: 'tailgater' },
                { name: 'Surge', price: 450, modelName: 'surge', image: 'surge' },
                { name: 'Penetrator', price: 500, modelName: 'penetrator', image: 'penetrator' },
                { name: 'Draugur', price: 3000, modelName: 'draugur', image: 'draugur' },

            ],
        },
        locations: baseRentLocations,
    },
    {
        name: 'Cycles Rent',
        dbName: 'Cycles-Rent',
        blipSprite: 494,
        blipColor: 38,
        blipScale: 1,
        data: {
            vehicles: [
                { name: 'Scorcher', price: 75, modelName: 'scorcher', image: 'scorcher' },
                { name: 'Fixter', price: 75, modelName: 'fixter', image: 'fixter' },
                { name: 'Cruiser', price: 75, modelName: 'cruiser', image: 'cruiser' },
                { name: 'BMX', price: 75, modelName: 'bmx', image: 'bmx' },
            ],
        },
        locations: cyclesRentLocations,
    },
    {
        name: 'Escalera Rent A Car',
        dbName: 'Escalera-Rent-A-Car',
        blipSprite: 227,
        blipColor: 38,
        blipScale: 1,
        data: {
            vehicles: [
                { name: 'Sentinel', price: 75, modelName: 'sentinel', image: 'sentinel' },
                { name: 'F620', price: 375, modelName: 'f620', image: 'f620' },
                { name: 'Dubsta', price: 250, modelName: 'dubsta', image: 'dubsta' },
                { name: 'Zion', price: 250, modelName: 'zion', image: 'zion' },
                { name: 'Club', price: 300, modelName: 'club', image: 'club' },
                { name: 'Patriot', price: 350, modelName: 'patriot', image: 'patriot' },
                { name: 'Tailgater', price: 400, modelName: 'tailgater', image: 'tailgater' },
                { name: 'Surge', price: 450, modelName: 'surge', image: 'surge' },
                { name: 'Penetrator', price: 500, modelName: 'penetrator', image: 'penetrator' },
                { name: 'Draugur', price: 3000, modelName: 'draugur', image: 'draugur' },
            ],
        },
        locations: escaleraRentLocations,
    },
];
