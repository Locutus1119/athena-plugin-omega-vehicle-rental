import IRent from './interfaces/IRent';
import { baseRentLocations } from './rentLists/baseRent';
import { cyclesRentLocations } from './rentLists/cyclesRent';


export const RentRegistry: Array<IRent> = [
    {
        name: 'Base Rent',
        dbName: 'Base-Rent',
        blipSprite: 227,
        blipColor: 38,
        blipScale: 1,
        data: {
            vehicles: [
                {name: 'Sentinel', price: 75, modelName: 'sentinel', icon:'crate' },
                {name: 'F620',  price: 375, modelName: 'f620', icon:'crate'  },
                {name: 'Dubsta',  price: 250, modelName: 'dubsta', icon:'crate' },
                {name: 'Zion',  price: 250, modelName: 'zion', icon:'crate'  },
                {name: 'Serrano',  price: 300, modelName: 'serrano', icon:'crate'  },
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
                {name: 'Scorcher', price: 75, modelName: 'scorcher', icon:'crate' },
               
            ],
        },
        locations: cyclesRentLocations,
    },
];
