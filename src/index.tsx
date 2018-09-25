import * as React from "react";
import * as ReactDOM from "react-dom";

import { MpgCalculator, Car, FuelType } from "./components/MPGCalculator"

let cars: Array<Car> = [
    {
        'name': 'Car 1',
        'mpg': 40,
        'price': 0,
        'fuelType': FuelType.regular,
        'insurance': null
    },
    {
        'name': 'Car 2',
        'mpg': 15,
        'price': 0,
        'fuelType': FuelType.regular,
        'insurance': null
    }
];

ReactDOM.render(
    <MpgCalculator data={cars} />,
    document.getElementById('root')
);