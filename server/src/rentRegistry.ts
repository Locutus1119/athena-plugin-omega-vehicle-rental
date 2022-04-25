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
                { name: 'Sentinel', price: 75, modelName: 'sentinel', icon: 'crate' },
                { name: 'F620', price: 375, modelName: 'f620', icon: 'crate' },
                { name: 'Dubsta', price: 250, modelName: 'dubsta', icon: 'crate' },
                { name: 'Zion', price: 250, modelName: 'zion', icon: 'crate' },
                { name: 'Serrano', price: 300, modelName: 'serrano', icon: 'crate' },
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
            vehicles: [{ name: 'Scorcher', price: 75, modelName: 'scorcher', icon: 'crate' }],
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
                { name: 'Sentinel', price: 75, modelName: 'sentinel', icon: 'crate' },
                { name: 'F620', price: 375, modelName: 'f620', icon: 'crate' },
                { name: 'Dubsta', price: 250, modelName: 'dubsta', icon: 'crate' },
                { name: 'Zion', price: 250, modelName: 'zion', icon: 'crate' },
                { name: 'Serrano', price: 300, modelName: 'serrano', icon: 'crate' },
                { name: 'Argento', price: 300, modelName: 'argento', icon: 'crate' },
                { name: 'Audi Q8', price: 300, modelName: 'q820', icon: 'crate' },
                { name: 'Audi RS5', price: 300, modelName: 'rs520', icon: 'crate' },
                { name: 'Audi RS6', price: 300, modelName: 'rs615', icon: 'crate' },
                { name: 'Audi R8 Spyder', price: 300, modelName: 'r8spyder20', icon: 'crate' },
            ],
        },
        locations: escaleraRentLocations,
    },
];
