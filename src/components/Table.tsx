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
    render() {
        return <table>
            <tr>
                <th>Name</th>
            </tr>
            {this.props.data.map((i) =>
                <tr>
                    <td>{i.name}</td>
                </tr>
            )}
        </table>
    }
}