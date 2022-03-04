import * as alt from 'alt-client';

const PAGE_NAME = 'RentUI';

alt.onServer(`${PAGE_NAME}:Client:OpenRent`, (rentVehicles: {}[], type: string,  rentImg: string) => {
    alt.emit(`${PAGE_NAME}:Vue:Open`, rentVehicles, type,  rentImg);
    return;
});
