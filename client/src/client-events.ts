import * as alt from 'alt-client';
// import { drawText2D } from '../../../../client/utility/text';
// import { Timer } from '../../../../client/utility/timers';
// import * as native from 'natives';
// import { SYSTEM_EVENTS } from '../../../../shared/enums/system';

const PAGE_NAME = 'RentUI';

alt.onServer(`${PAGE_NAME}:Client:OpenRent`, (rentVehicles: {}[], type: string,  rentImg: string) => {
    alt.emit(`${PAGE_NAME}:Vue:Open`, rentVehicles, type,  rentImg);
    return;
});
