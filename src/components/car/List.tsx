import * as React from "react";
import { Car } from "./Car";
import { Adder } from "./Adder";
import { fuelString, FuelType, FuelPrice } from "../Fuel";
import { Modal } from "../Modal";
import { MinimizableCard } from "../MinimizableCard";
import { DeleteConfirm } from "../DeleteConfirm";

interface ListingProps {
    data: Car;
    removeCar: (car: String) => void;
}

function Listing(props: ListingProps) {
    return (
        <li className="car-listing list-group-item">
            <span>
                {props.data.name}
                <DeleteConfirm className="btn-sm" delete={props.removeCar}></DeleteConfirm>
            </span>
            <div className="details">
                <span>MPG: {props.data.mpg}</span>
                <span>Price: {props.data.price}</span>
                <span>Fuel Type: {fuelString(props.data.fuelType)}</span>
                <span>Insurance: {props.data.insurance}</span>
                <span>Registration: {props.data.registration}</span>
            </div>
        </li>
    );
}

interface ListProps {
    data: Array<Car>;
    addCar: (data: Car) => boolean;
    removeAll: () => void;
    removeCar: (car: String) => void;
};

export class List extends React.Component<ListProps> {
    constructor(props: ListProps) {
        super(props);
    }

    render() {
        const controls = <div>
            <Modal submit={{
                buttonName: "Add",
                formName: "addCar"
            }} triggerText="Add Vehicle" title="Add Vehicle">
                <Adder addCar={this.props.addCar} />
            </Modal>
            <DeleteConfirm text="Clear All" delete={this.props.removeAll} />
        </div>;

        return <MinimizableCard title="Vehicles">
            <React.Fragment>
                {controls}
                <ul className="list-group list-group-flush">
                    {this.props.data.map((i) => <Listing
                        data={i}
                        removeCar={this.props.removeCar.bind(this, i.name)} />)}
                </ul>
            </React.Fragment>
        </MinimizableCard>;
    }
}