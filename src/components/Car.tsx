import * as React from "react";
import { FuelBadge, FuelType } from "./Fuel";
import { Modal } from "./Modal";

export interface Car {
    name: string;
    price: number;
    mpg: number;
    insurance: number;
    registration: number;
    fuelType: FuelType;
}

interface CarListingProps {
    data: Car;
    removeCar: any; // Fix later
}

function CarListing(props: CarListingProps) {
    return (
        <li className="list-group-item">
            {props.data.name}
            <FuelBadge fuel={props.data.fuelType} />
            <button type="button" className="btn btn-danger btn-sm" onClick={props.removeCar}>x</button>
        </li>
    );
}

interface CarListProps {
    data: Array<Car>;
    addCar: any; // fix later
    removeCar: any;
};

export class CarList extends React.Component<CarListProps> {
    render() {
        return <div className="card">
            <div className="card-header">
                Vehicles
                <Modal
                    title="Add Vehicle"
                    triggerText="Add a Vehicle"
                    visible={false}>
                    <CarAdder addCar={this.props.addCar} />
                </Modal>
            </div>
            <div className="card-body">
                <ul className="list-group list-group-flush">
                    {this.props.data.map((i) => <CarListing data={i} removeCar={this.props.removeCar.bind(this, i.name)} />)}
                </ul>
            </div>
        </div>
    }
}

interface CarAdderProps {
    addCar: any; // fix later
}

class CarAdder extends React.Component<CarAdderProps, Car> {
    constructor(props: CarAdderProps) {
        super(props);

        // Default values for new cars
        this.state = {
            'name': null,
            'mpg': null,
            'price': 0,
            'fuelType': FuelType.regular,
            'insurance': 0,
            'registration': 0
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addCar = this.addCar.bind(this);
    }

    addCar(state) {
        this.props.addCar(state);
    }

    handleChange(event) {
        // Update state to reflect input values
        let temp: Car = this.state;
        let new_value: any = event.target.value;

        // TODO: Might want to revise second condition
        if (event.target.type == "number" || !isNaN(event.target.value)) {
            new_value = parseFloat(new_value);
        }

        temp[event.target.id] = new_value;
        this.setState(temp);
    }

    handleSubmit(event) {
        this.addCar(this.state);
        event.preventDefault(); // Stop reloading page
    }

    render() {
        return <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>Name
                    <input className="form-control" name="Name" id="name" onChange={this.handleChange} required />
                </label>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Fuel Type
                        <select className="form-control" name="Fuel Type" id="fuelType" onChange={this.handleChange}>
                            <option value={FuelType.regular}>Regular (87)</option>
                            <option value={FuelType.mid}>Mid-Grade (89)</option>
                            <option value={FuelType.premium}>Premium (92)</option>
                            <option value={FuelType.diesel}>Diesel</option>
                        </select>
                    </label>
                </div>

                <div className="form-group">
                    <label>MPG
                    <input className="form-control" type="number" min="0" name="MPG" id="mpg" onChange={this.handleChange} required />
                    </label>
                </div>
            </div>

            <div className="form-group">
                <label>Price
                    <input className="form-control"
                        type="number"
                        min="0"
                        value={this.state.price}
                        name="Price"
                        id="price"
                        onChange={this.handleChange}
                        required />
                </label>
            </div>
            <div className="">
                <label>
                    Insurance
                    <input className="form-control"
                        type="number"
                        value={this.state.insurance}
                        name="Insurance"
                        id="insurance"
                        onChange={this.handleChange}
                    />
                </label>
            </div>
            <div className="form-group">
                <label>Vehicle Registration
                    <input className="form-control"
                        type="number"
                        value={this.state.registration}
                        name="Registration"
                        id="registration"
                        onChange={this.handleChange}
                    />
                </label>
            </div>
            <button type="submit" className="btn btn-primary">Add</button>
        </form>
    }
}