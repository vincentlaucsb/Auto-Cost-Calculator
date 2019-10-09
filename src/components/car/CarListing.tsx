import * as React from "react";
import { Car } from "./Car";
import { fuelString, FuelType, FuelPrice } from "../Fuel";
import { Button } from "../Buttons";
import { DeleteConfirm } from "../DeleteConfirm";
import { CarDatabase } from "../CarDatabase";
import { NumberField, GasField } from "./CarFields";

interface ListingState {
    carData: Car;
    isEditable: boolean;
}

interface ListingProps {
    data: Car;
    updateCar: (data: Car) => void;
    removeCar: (car: number) => void;
}

// An individual car listing
export class CarListing extends React.Component<ListingProps, ListingState> {
    constructor(props: ListingProps) {
        super(props);
        this.state = {
            carData: props.data,
            isEditable: false
        };

        this.updateMpg = this.updateMpg.bind(this);
        this.updatePrice = this.updatePrice.bind(this);
        this.updateRegistration = this.updateRegistration.bind(this);
        this.updateInsurance = this.updateInsurance.bind(this);
        this.updateFuel = this.updateFuel.bind(this);
        this.makeEditable = this.makeEditable.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    makeEditable(event) {
        this.setState({ isEditable: !this.state.isEditable });
    }

    handleSubmit(event) {
        this.setState({
            isEditable: false
        });

        this.props.updateCar(this.state.carData);
    }

    updateMpg(event) {
        let newCarData = this.state.carData;
        newCarData.mpg = event.target.value;

        this.setState({
            carData: newCarData
        });
    }

    updatePrice(event) {
        let newCarData = this.state.carData;
        newCarData.price = event.target.value;

        this.setState({
            carData: newCarData
        });
    }

    updateInsurance(event) {
        let newCarData = this.state.carData;
        newCarData.insurance = event.target.value;

        this.setState({
            carData: newCarData
        });
    }

    updateRegistration(event) {
        let newCarData = this.state.carData;
        newCarData.registration = event.target.value;

        this.setState({
            carData: newCarData
        });
    }

    updateFuel(event) {
        let newCarData = this.state.carData;
        newCarData.fuelType = event.target.value;

        this.setState({
            carData: newCarData
        });
    }

    render() {
        var gasFieldOptions = new Map();
        for (var i = 0; i < 4; i++)
        {
            gasFieldOptions.set(i, fuelString(i)); 
        }

        var details = <span>Fuel Type: {fuelString(this.state.carData.fuelType)}</span>
        var editButton = <img src="./img/edit-24px.svg" alt="Edit" onClick={this.makeEditable} />;

        if (this.state.isEditable) {
            details = <span>Fuel Type: {fuelString(this.state.carData.fuelType)}</span>;
            editButton = <img src="./img/save-24px.svg" alt="Save" onClick={this.handleSubmit} />;
        }

        return (
            <li className="car-listing list-group-item">
                <span style={{
                    display: "flex",
                    flexDirection: "row"
                }}>
                    {this.props.data.name}
                    <span style={{ paddingLeft: "4px" }}>
                        {editButton}
                        <DeleteConfirm className="btn-sm" delete={this.props.removeCar}></DeleteConfirm>
                    </span>
                </span>
                <div className="details">
                    <NumberField
                        label="MPG"
                        value={this.state.carData.mpg}
                        fieldName="mpg"
                        isEditable={this.state.isEditable}
                        onChange={this.updateMpg}
                    />
                    <NumberField
                        label="Price"
                        value={this.state.carData.price}
                        fieldName="price"
                        isEditable={this.state.isEditable}
                        onChange={this.updatePrice}
                    />
                    <GasField
                        label="Fuel Type"
                        value={this.state.carData.fuelType}
                        options={gasFieldOptions}
                        fieldName="fuelType"
                        isEditable={this.state.isEditable}
                        onChange={this.updateFuel}
                    />
                    <NumberField
                        label="MPG"
                        value={this.state.carData.mpg}
                        fieldName="mpg"
                        isEditable={this.state.isEditable}
                        onChange={this.updatePrice}
                    />
                    <NumberField
                        label="Insurance"
                        value={this.state.carData.insurance}
                        fieldName="insurane"
                        isEditable={this.state.isEditable}
                        onChange={this.updatePrice}
                    />
                </div>
            </li>
        );
    }
}