import { Event } from './events';
import { Blip } from './blip';
import { Colshape } from './colshape';
import { Marker } from './marker';

export const essentials = {
    events: {
        on: Event.on,
        off: Event.off,
        emit: Event.emit,
    },
    colshape: {
        create: Colshape.create
    },
    blip: {
        create: Blip.create,
    },
    marker: {
        create: Marker.create,
    }
};