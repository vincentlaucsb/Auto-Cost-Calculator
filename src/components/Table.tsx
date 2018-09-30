import * as React from "react";
import { FuelPrice } from "./Fuel";
import { Car } from "./Car";

interface TableProps {
    months: number;
    annualMileage: number;
    ppg: FuelPrice;
    data: Array<Car>;
}

export class Table extends React.Component<TableProps> {
    costToDrive(i: Car, miles: number) {
        return '$' + parseFloat(
            (miles / i.mpg * this.props.ppg.get(i.fuelType)).toFixed(2)
        );
    }

    render() {
        return <table>
            <tr>
                <th></th>
                <th colSpan={3}>Cost to Drive (Gas Only)</th>
            </tr>
            <tr>
                <th>Name</th>
                <th>10 Miles</th>
                <th>25 Miles</th>
                <th>100 Miles</th>
            </tr>
            {this.props.data.map((i) =>
                <tr>
                    <td>{i.name}</td>
                    <td>{this.costToDrive(i, 10)}</td>
                    <td>{this.costToDrive(i, 25)}</td>
                    <td>{this.costToDrive(i, 100)}</td>
                </tr>
            )}
        </table>
    }
}