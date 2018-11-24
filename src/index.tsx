import * as React from "react";
import * as ReactDOM from "react-dom";

import { MpgCalculator } from "./components/MPGCalculator"
import { Car } from "./components/car/Car"
import { FuelType } from "./components/Fuel"

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

ReactDOM.render(
    <MpgCalculator data={cars} />,
    document.getElementById('root')
);