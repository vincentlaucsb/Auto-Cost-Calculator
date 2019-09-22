import * as React from "react";
import { FuelPrice } from "../Fuel";
import { money } from "../helpers";
import { Car } from "./Car";
import { CarDatabase } from "../CarDatabase";

interface TableProps {
    months: number;
    annualMileage: number;
    ppg: FuelPrice;
    data: CarDatabase;
}

export class Table extends React.Component<TableProps> {
    render() {
        const ppg = this.props.ppg;

        return <table>
            <thead>
                <tr>
                    <th></th>
                    <th colSpan={4}>Cost to Drive (Gas Only)</th>
                </tr>
                <tr>
                    <th>Name</th>
                    <th>10 Miles</th>
                    <th>25 Miles</th>
                    <th>100 Miles</th>
                    <th>One Month</th>
                </tr>
            </thead>
            <tbody>
                {this.props.data.toArray().map((i) =>
                <tr>
                    <td>{i.name}</td>
                    <td>{money(i.costToDriveGasOnly(10, ppg))}</td>
                    <td>{money(i.costToDriveGasOnly(25, ppg))}</td>
                    <td>{money(i.costToDriveGasOnly(100, ppg))}</td>
                    <td>{money(i.costToDriveGasOnly(this.props.annualMileage / 12, ppg))}</td>
                </tr>
                )}
            </tbody>
        </table>
    }
}