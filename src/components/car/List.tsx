import * as React from "react";
import { Car } from "./Car";
import { Adder } from "./Adder";
import { CarListing } from "./CarListing";
import { Modal } from "../Modal";
import { MinimizableCard } from "../MinimizableCard";
import { DeleteConfirm } from "../DeleteConfirm";
import { CarDatabase } from "../CarDatabase";

interface ListProps {
    data: CarDatabase;
    addCar: (data: Car) => void;
    removeAll: () => void;
    removeCar: (car: number) => void;
};

// A list of vehicles
export class CarList extends React.Component<ListProps> {
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
                    {this.props.data.toArray().map((i) => <CarListing
                        data={i}
                        removeCar={this.props.removeCar.bind(this, i.id)} />)}
                </ul>
            </React.Fragment>
        </MinimizableCard>;
    }
}