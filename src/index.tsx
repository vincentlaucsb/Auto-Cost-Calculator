import * as React from "react";
import * as ReactDOM from "react-dom";

import * as Globals from "./components/Globals"
import { AutoCostCalculator } from "./components/AutoCostCalculator"
import { Car } from "./components/car/Car"
import { FuelType, FuelPrice } from "./components/Fuel"
import { CarDatabase } from "./components/CarDatabase";

let defaults = (new Globals.Defaults());

let savedData = localStorage.getItem('autoCostData');
let carDb = defaults.cars();
let ppg = defaults.ppg();

if (savedData != null) {
    savedData = JSON.parse(savedData);
    carDb.removeAll();
    carDb.load(savedData['data']);
    ppg.load(savedData['ppg']);
}

ReactDOM.render(
    <AutoCostCalculator data={carDb} ppg={ppg} />,
    document.getElementById('root')
);