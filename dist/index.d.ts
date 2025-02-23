import { Event } from './events';
import { Blip } from './blip';
import { Colshape } from './colshape';
import { Marker } from './marker';
export declare const essentials: {
    events: {
        on: typeof Event.on;
        off: typeof Event.off;
        emit: typeof Event.emit;
    };
    colshape: {
        create: typeof Colshape.create;
    };
    blip: {
        create: typeof Blip.create;
    };
    marker: {
        create: typeof Marker.create;
    };
};
