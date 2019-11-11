import * as React from "react";
import { Car } from "./Car";
import { fuelString, FuelType, FuelPrice } from "../Fuel"

interface AdderState {
    car: Car;
    error: boolean;
}

// Form used for adding new cars
export class Adder extends React.Component<
    { addCar: (data: Car) => void }, AdderState> {

    constructor(props) {
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
        this.props.addCar(state);
    }

    handleChange(event) {
        // Update state to reflect input values
        let temp = this.state.car;
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

        // Reset car (but only if non-errored)
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
                    <input className="form-control" type="number" name="MPG" id="mpg" onChange={this.handleChange} required />
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