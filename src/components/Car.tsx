import * as React from "react";
import { fuelString, FuelType, FuelPrice } from "./Fuel"
import { Modal } from "./Modal";

class CarData {
    name: string;
    price: number;
    mpg: number;
    insurance: number;    // per month
    registration: number; // per ?
    fuelType: FuelType;
}

export class Car extends CarData {
    constructor(data: CarData = {
        name: "",
        price: 0,
        mpg: 0,
        insurance: 0,
        registration: 0,
        fuelType: FuelType.regular
    }) {
        super();
        this.name = data.name;
        this.price = data.price;
        this.mpg = data.mpg;
        this.insurance = data.insurance;
        this.registration = data.registration;
        this.fuelType = data.fuelType;
    }

    costToDriveMonth(monthlyMileage: number, months: number, ppg: FuelPrice): number {
        // Calculate the total cost to drive a car x months
        const miles = months * monthlyMileage;
        return this.price +
            (this.insurance * months) +
            this.costToDriveGasOnly(miles, ppg);
    }

    costToDriveGasOnly(miles: number, ppg: FuelPrice): number {
        // Calculate the cost to drive a car (gas only)
        return (miles / this.mpg) * ppg.get(this.fuelType);
    }
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
        var carInfo =
            <div className="row">
                <div className="col-sm">
                    MPG:
                </div>
                <div className="col-sm">
                    Fuel Type:
                </div><div className="col-sm">
                    Price:
            </div>
        </div>;

        if (this.state.activeCar) {
            carInfo = <div className="row">
                <div className="col-sm">
                    MPG: {this.state.activeCar.mpg}
                    </div>
                <div className="col-sm">
                    Fuel Type: {fuelString(this.state.activeCar.fuelType)}
                    </div><div className="col-sm">
                    Price: ${this.state.activeCar.price}
                    </div>
            </div>;
        }

        return <div className="card">
            <div className="card-header">
                Vehicles
                <div style={{float: 'right'}}>
                    <Modal
                        title="Add Vehicle"
                        triggerText="+"
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
                        x
                    </button>
                    </div>
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
    // Form used for adding new cars

    constructor(props: CarAdderProps) {
        super(props);

        // Default values for new cars
        this.state = {
            'car': new Car(),
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

        // Reset car
        this.setState({ car: new Car() });
    }

    fuelOption(type: FuelType) {
        return <option value={type}>{fuelString(type)}</option>;
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
                            {this.fuelOption(FuelType.regular)}
                            {this.fuelOption(FuelType.mid)}
                            {this.fuelOption(FuelType.premium)}
                            {this.fuelOption(FuelType.diesel)}
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
                        Insurance (Monthly)
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