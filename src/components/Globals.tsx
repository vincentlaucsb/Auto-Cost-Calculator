// Default values for the Car Cost Calculator

import { CarDatabase } from "./CarDatabase";
import { FuelType, FuelPrice } from "./Fuel";
import { Car } from "./Car/Car";

export class Defaults {
    cars(): CarDatabase {
        let cars: Array<Car> = [
            new Car({
                'name': '2018 Ford F-150',
                'mpg': 23,
                'price': 27705,
                'fuelType': FuelType.regular,
                'insurance': 0,
                'registration': 0
            }),
            new Car({
                'name': '2018 Chevrolet Silverado 1500',
                'mpg': 21,
                'price': 28300,
                'fuelType': FuelType.regular,
                'insurance': 0,
                'registration': 0
            }),
            new Car({
                'name': '2018 Ram 1500',
                'mpg': 23,
                'price': 27295,
                'fuelType': FuelType.regular,
                'insurance': 0,
                'registration': 0
            }),
            new Car({
                'name': '2018 Toyota RAV4',
                'mpg': 26,
                'price': 24660,
                'fuelType': FuelType.regular,
                'insurance': 0,
                'registration': 0
            }),
            new Car({
                'name': '2018 Nissan Rogue',
                'mpg': 29,
                'price': 24800,
                'fuelType': FuelType.regular,
                'insurance': 0,
                'registration': 0
            }),
            new Car({
                'name': '2018 Toyota Camry',
                'mpg': 34,
                'price': 23645,
                'fuelType': FuelType.regular,
                'insurance': 0,
                'registration': 0
            }),
        ];

        let carDb = new CarDatabase();
        for (var i in cars) {
            carDb.addCar(cars[i]);
        }

        return carDb;
    }

   ppg() : FuelPrice {
        var defaultPpg = new FuelPrice();
        defaultPpg.set(FuelType.regular, 2.87);
        defaultPpg.set(FuelType.mid, 3.15);
        defaultPpg.set(FuelType.premium, 3.4);
        defaultPpg.set(FuelType.diesel, 3.18);
        return defaultPpg;
    }
}