import * as React from "react";
import { FuelType } from "./Fuel";
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
    hoverOver: any;
    hoverOut: any;
}

function CarListing(props: CarListingProps) {
    return (
        <li className="list-group-item"
            onMouseEnter={props.hoverOver}
            onMouseOut={props.hoverOut}
        >
            {props.data.name}
            <button
                type="button"
                className="btn btn-danger btn-sm"
                style={{
                    float: 'right'
                }}
                onClick={props.removeCar}>x</button>
        </li>
    );
}

interface CarListProps {
    data: Array<Car>;
    addCar: any; // fix later
    removeAll: any;
    removeCar: any;
};

export class CarList extends React.Component<CarListProps, {
    activeCar: Car
}> {
    constructor(props: CarListProps) {
        super(props);

        this.state = {
            activeCar: null
        };

        this.hoverOver = this.hoverOver.bind(this);
        this.hoverOut = this.hoverOut.bind(this);
    }

    hoverOver(car, event) {
        this.setState({
            activeCar: car
        });
    }

    hoverOut(event) {
        this.setState({
            activeCar: null
        });

    }

    render() {
        var carInfo = <p>
            Fuel Type: ...
            Price: ...
        </p>;

        if (this.state.activeCar) {
            carInfo = <p>
                Fuel Type: {this.state.activeCar.fuelType}
                Price: {this.state.activeCar.price}
            </p>;
        }

        return <div className="card">
            <div className="card-header">
                Vehicles
                <Modal
                    title="Add Vehicle"
                    triggerText="Add a Vehicle"
                    submit={{
                        buttonName: "Add",
                        formName: "addCar"
                    }}
                    visible={false}>
                    <CarAdder addCar={this.props.addCar} />
                </Modal>
                <button
                    className="btn btn-primary btn-danger"
                    onClick={this.props.removeAll}>
                    Clear All
                </button>
            </div>
            <div className="card-body">
                {carInfo}

                <ul className="list-group list-group-flush">
                    {this.props.data.map((i) => <CarListing
                        data={i}
                        hoverOver={this.hoverOver.bind(this, i)}
                        hoverOut={this.hoverOut}
                        removeCar={this.props.removeCar.bind(this, i.name)} />)}
                </ul>
            </div>
        </div>
    }
}

interface CarAdderProps {
    addCar: any; // fix later
}

interface CarAdderState {
    car: Car;
    error: boolean;
}

class CarAdder extends React.Component<CarAdderProps, CarAdderState> {
    constructor(props: CarAdderProps) {
        super(props);

        // Default values for new cars
        this.state = {
            'car': {
                'name': null,
                'mpg': null,
                'price': 0,
                'fuelType': FuelType.regular,
                'insurance': 0,
                'registration': 0
            },
            error: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addCar = this.addCar.bind(this);
    }

    addCar(state) {
        // Add new car
        if (!this.props.addCar(state)) {
            // Display error message if car with the same name already exists
            this.setState({ error: true });
        }
    }

    handleChange(event) {
        // Update state to reflect input values
        let temp: Car = this.state.car;
        let new_value: any = event.target.value;

        // TODO: Might want to revise second condition
        if (event.target.type == "number" || !isNaN(event.target.value)) {
            new_value = parseFloat(new_value);
        }

        temp[event.target.id] = new_value;
        this.setState({ car: temp });
    }

    handleSubmit(event) {
        this.addCar(this.state.car);
        event.preventDefault(); // Stop reloading page
    }

    render() {
        var errorMessage;

        if (this.state.error) {
             errorMessage = <p>Car with the same name already exists.</p>;
        }

        return <form onSubmit={this.handleSubmit} id="addCar">
            {errorMessage}

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
                        value={this.state.car.price}
                        name="Price"
                        id="price"
                        onChange={this.handleChange}
                        required />
                </label>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>
                        Insurance
                        <input className="form-control"
                            type="number"
                            value={this.state.car.insurance}
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
                            value={this.state.car.registration}
                            name="Registration"
                            id="registration"
                            onChange={this.handleChange}
                        />
                    </label>
                </div>
            </div>
        </form>
    }
}