import {ShipInstance} from './shipInstance.mjs';
/*
    Basic player class.

    Stores persistent info (coins, fame, whatever I need) and ship configuration (need to figure out how to do that properly).

    In future, here will be also information about base you have in some efficient way.
*/
export class Player {
    constructor(credits, shipClass) {
        this.credits = credits;
        this.shipInstance = new ShipInstance(shipClass);          
    }
}
