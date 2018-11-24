import * as React from "react";
import { Button, DangerButton } from "../Buttons";
import { fuelString, FuelType, FuelPrice } from "../Fuel";
import { MinimizableCard } from "../MinimizableCard";
import { DeleteConfirm } from "../DeleteConfirm";

class CarData {
    name: string;
    price: number;
    mpg: number;
    insurance: number;    // per month
    registration: number; // per ?
    fuelType: FuelType;
}

export class Car extends CarData {
    constructor(data: CarData = {
        name: "",
        price: 0,
        mpg: 0,
        insurance: 0,
        registration: 0,
        fuelType: FuelType.regular
    }) {
        super();
        this.name = data.name;
        this.price = data.price;
        this.mpg = data.mpg;
        this.insurance = data.insurance;
        this.registration = data.registration;
        this.fuelType = data.fuelType;
    }

    costToDriveMonth(monthlyMileage: number, months: number, ppg: FuelPrice): number {
        // Calculate the total cost to drive a car x months
        const miles = months * monthlyMileage;
        return this.price +
            (this.insurance * months) +
            this.costToDriveGasOnly(miles, ppg);
    }

    costToDriveGasOnly(miles: number, ppg: FuelPrice): number {
        // Calculate the cost to drive a car (gas only)
        return (miles / this.mpg) * ppg.get(this.fuelType);
    }
}