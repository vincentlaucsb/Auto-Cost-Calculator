import * as React from "react";
import * as ReactDOM from "react-dom";

import { MpgCalculator } from "./components/MPGCalculator"
import { Car } from "./components/car/Car"
import { FuelType, FuelPrice } from "./components/Fuel"
import { CarDatabase } from "./components/CarDatabase";

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

let savedData = localStorage.getItem('autoCostData');
let ppg = new FuelPrice();
ppg.set(FuelType.regular, 2.87);
ppg.set(FuelType.mid, 3.15);
ppg.set(FuelType.premium, 3.4);
ppg.set(FuelType.diesel, 3.18);

if (savedData != null) {
    savedData = JSON.parse(savedData);
    carDb.load(savedData['data']);
    ppg.load(savedData['ppg']);
}

ReactDOM.render(
    <MpgCalculator data={carDb} ppg={ppg} />,
    document.getElementById('root')
);