import { Car } from "./Car/Car";
import { IJsonSerializable } from "./IJsonSerializable";
import { jsonifyMap } from "./helpers";

// Stores information of all cars in the app
export class CarDatabase implements IJsonSerializable {
    load(data: object) {
        // data is assumed to be a JSON array
        for (let k in data) {
            this.data.set(Number(k), data[k]);
        }
    }

    dump(): object {
        console.log("DUMPING CAR", JSON.stringify(this.data.get(0)));
        return this.toArray();
    }

    data: Map<number, Car>;

    // The ID assigned to the next listing
    nextId: number;

    constructor() {
        this.data = new Map<number, Car>();
        this.nextId = 0;
    }

    // Return an array of cars
    toArray() {
        return Array.from(this.data.values());
    }

    // Add a car listing
    addCar(record: Car) {
        record.id = this.nextId;
        this.data.set(this.nextId, record);
        this.nextId++;
    }

    // Update a car listing
    updateCar(id: number, data: Car) {
        this.data.set(id, data);
    }

    // Remove a car by ID
    removeCar(id: number) {
        return this.data.delete(id);
    }

    // Remove all car listings
    removeAll() {
        this.data.clear();
    }
}