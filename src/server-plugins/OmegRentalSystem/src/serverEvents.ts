import * as alt from 'alt-server';
import Logger from '../../../server/utility/athenaLogger';

import { OVRS_TRANSLATIONS } from '../index';
import { playerFuncs } from '../../../server/extensions/extPlayer';
import { CurrencyTypes } from '../../../shared/enums/currency';
import { ServerMarkerController } from '../../../server/streamers/marker';
import { ServerBlipController } from '../../../server/systems/blip';
import { InteractionController } from '../../../server/systems/interaction';
import { MARKER_TYPE } from '../../../shared/enums/markerTypes';
import Rent from './controller';

const PAGENAME = 'RentUI';

alt.onClient(`${PAGENAME}:Server:HandleRent`, async (player: alt.Player, rentVehicle: any, amount: number) => {
    const rentVeh = rentVehicle.modelName;
    const rentOutPos = rentVehicle.outPos;
    const rentOutRot = rentVehicle.outRot;
    const rentPrice = rentVehicle.price * amount;
    const rentTime = amount * 60000;
    const Test = new alt.ColshapeSphere(rentVehicle.outPos.x, rentVehicle.outPos.y, rentVehicle.outPos.z - 1, 2);
    const rentUid = `Rent-${player.id}-${rentVeh}`;

    alt.log(JSON.stringify(`pointTest ${Test}`));
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

    playerFuncs.currency.sub(player, CurrencyTypes.CASH, rentPrice);
    playerFuncs.emit.notification(player, `${OVRS_TRANSLATIONS.rentStart} ${rentVeh} `);
    Logger.info(`(${player.data.name}) kibérelt egy ${rentVeh} itt: ${player.pos}`);
});
