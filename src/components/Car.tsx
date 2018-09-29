import { FuelType } from "./Fuel";

export interface Car {
    name: string;
    price: number;
    mpg: number;
    insurance: number;
    fuelType: FuelType;
}
