# OmegaRentalSystem
!!!Special thanks to DerLord for all the help and OSS!!!

Install plugin:

Drop RentUI into a folder called “RentUI” inside of src-webviews/src/pages

Drop server/client files into OmegaRentalSystem --client stuff here -> src/core/client-plugins --server stuff here -> src/core/server-plugins

Imports (Client) ->

--import './OmegaRentalSystem/view';

--import './OmegaRentalSystem/src/client-events';

Imports (Server) ->

--import "./OmegaRentalSystem/index";

src-webviews/pages/components.ts ->

--import RentUI from './rentUI/RentUI.vue';

--RentUI: shallowRef(RentUI),
