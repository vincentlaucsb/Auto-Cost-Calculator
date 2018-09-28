import * as React from "react";
import * as ReactDOM from "react-dom";

import { MpgCalculator, Car } from "./components/MPGCalculator"
import { FuelType } from "./components/Fuel"

let cars: Array<Car> = [
    {
        'name': '2018 Ford F-150',
        'mpg': 23,
        'price': 27705,
        'fuelType': FuelType.regular,
        'insurance': null
    },
    {
        'name': '2018 Chevrolet Silverado 1500',
        'mpg': 21,
        'price': 28300,
        'fuelType': FuelType.regular,
        'insurance': null
    },
    {
        'name': '2018 Ram 1500',
        'mpg': 23,
        'price': 27295,
        'fuelType': FuelType.regular,
        'insurance': null
    },
    {
        'name': '2018 Toyota RAV4',
        'mpg': 26,
        'price': 24660,
        'fuelType': FuelType.regular,
        'insurance': null
    },
    {
        'name': '2018 Nissan Rogue',
        'mpg': 29,
        'price': 24800,
        'fuelType': FuelType.regular,
        'insurance': null
    },
    {
        'name': '2018 Toyota Camry',
        'mpg': 34,
        'price': 23645,
        'fuelType': FuelType.regular,
        'insurance': null
    },
];

ReactDOM.render(
    <MpgCalculator data={cars} />,
    document.getElementById('root')
);