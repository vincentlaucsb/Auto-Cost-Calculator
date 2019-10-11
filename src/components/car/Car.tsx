import * as React from "react";
import { Button, DangerButton } from "../Buttons";
import { fuelString, FuelType, FuelPrice } from "../Fuel";
import { MinimizableCard } from "../MinimizableCard";
import { DeleteConfirm } from "../DeleteConfirm";

class CarData {
    id: number;
    name: string;
    price: number;
    mpg: number;
    insurance: number;    // per month
    registration: number; // per ?
    fuelType: FuelType;
}

enum ServiceFrequency {
    Month,
    Miles
}

// Represents a reoccurring car service item, e.g.
// an oil change or tire replacements
class ServiceItem {
    name: string;
    frequency: number;
    frequencyType: ServiceFrequency;
}

export class Car {
    data: CarData;

    constructor(data: CarData = {
        id: -1,
        name: "",
        price: 0,
        mpg: 0,
        insurance: 0,
        registration: 0,
        fuelType: FuelType.regular
    }) {
        this.data = data;
    }

    get id() { return this.data.id; }
    get name() { return this.data.name; }
    get price() { return this.data.price; }
    get mpg() { return this.data.mpg; }
    get insurance() { return this.data.insurance; }
    get registration() { return this.data.registration; }
    get fuelType() { return this.data.fuelType; }

    set name(value: any) {
        this.data.name = value;
    }

    // Make sure values are numeric types and not strings
    set price(value: any) {
        this.data.price = parseFloat(value);
    }

    set id(value: any) {
        this.data.id = parseInt(value);
    }

    set mpg(value: any) {
        this.data.mpg = parseFloat(value);
    }

    set fuelType(value: any) {
        this.data.fuelType = parseInt(value);
    }

    set insurance(value: any) {
        this.data.insurance = parseFloat(value);
    }

    set registration(value: any) {
        this.data.registration = parseFloat(value);
    }

    // Calculate the total cost to drive a car x months
    costToDriveMonth(monthlyMileage: number, months: number, ppg: FuelPrice): number {
        const miles = months * monthlyMileage;
        let ret = this.price +
            (this.insurance * months) +

            // Divide annual registration cost by month
            ((this.registration / 12) * months) +

            this.fuelCost(miles, ppg);
        return ret;
    }

    fuelCost(miles: number, ppg: FuelPrice): number {
        // Calculate the cost to drive a car (gas only)
        return (miles / this.mpg) * ppg.get(this.fuelType);
    }
}