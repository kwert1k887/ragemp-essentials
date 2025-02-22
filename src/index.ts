import { Event } from './events';
import { Blip } from './blip';
import { Marker } from './marker';

export const essentials = {
    events: {
        on: Event.on,
        off: Event.off,
        emit: Event.emit,
    },
    blip: {
        create: Blip.create,
    },
    marker: {
        create: Marker.create,
    }
};