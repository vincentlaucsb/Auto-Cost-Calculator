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
    updateCar: (id: number, data: Car) => void;
    removeCar: (car: number) => void;
};

// A list of vehicles
export class CarList extends React.Component<ListProps> {
    constructor(props: ListProps) {
        super(props);
    }

    updateCar(id: number, data: Car) {
        this.props.updateCar(id, data);
    }

    render() {
        const clearAll = <DeleteConfirm text="Clear All" delete={this.props.removeAll} />;

        // Controls to add a car and remove all cars
        const controls = <React.Fragment>
            <Modal submit={{
                    buttonName: "Add",
                    formName: "addCar"
                }}

                buttonProps={{
                    className: "btn-sm"
                }}

                triggerText="Add Vehicle" title="Add Vehicle">
                <Adder addCar={this.props.addCar} />
            </Modal>
            <DeleteConfirm className="btn-sm" text="Clear All" delete={this.props.removeAll} />
        </React.Fragment>;

        return <MinimizableCard title="Vehicles" titleCorner={controls}>
            <React.Fragment>
                <div style={{
                    overflowX: "hidden",
                    overflowY: "scroll"
                }}>
                <ul className="list-group list-group-flush" >
                    {this.props.data.toArray().map((i) => <CarListing
                        data={i}
                        updateCar={this.updateCar.bind(this, i.id)}
                        removeCar={this.props.removeCar.bind(this, i.id)} />)}
                    </ul>
                </div>
            </React.Fragment>
        </MinimizableCard>;
    }
}