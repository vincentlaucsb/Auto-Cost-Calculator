import * as React from "react";
import { Car } from "./Car";
import { fuelString, FuelType, FuelPrice } from "../Fuel";
import { Button } from "../Buttons";
import { DeleteConfirm } from "../DeleteConfirm";
import { CarDatabase } from "../CarDatabase";

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

    render() {
        var details = <div className="details">
            <span>MPG: {this.state.carData.mpg}</span>
            <span>Price: {this.state.carData.price}</span>
            <span>Fuel Type: {fuelString(this.state.carData.fuelType)}</span>
            <span>Insurance: {this.state.carData.insurance}</span>
            <span>Registration: {this.state.carData.registration}</span>
        </div>

        var editButton = <Button onClick={this.makeEditable}>Edit</Button>;

        if (this.state.isEditable) {
            details = <div className="details">
                <span>MPG: <input name="mpg" value={this.state.carData.mpg} onChange={this.updateMpg}></input></span>
                <span>Price: <input name="price" value={this.state.carData.price} onChange={this.updatePrice}></input></span>
                <span>Fuel Type: {fuelString(this.state.carData.fuelType)}</span>
                <span>Insurance: <input name="insurance" value={this.state.carData.insurance} onChange={this.updateInsurance}></input></span>
                <span>Registration: <input name="registration" value={this.state.carData.registration} onChange={this.updateRegistration}></input></span>
            </div>

            editButton = <Button onClick={this.handleSubmit}>Update</Button>;
        }

        return (
            <li className="car-listing list-group-item">
                <span>
                    {this.props.data.name}
                    <DeleteConfirm className="btn-sm" delete={this.props.removeCar}></DeleteConfirm>
                    {editButton}
                </span>
                {details}
            </li>
        );
    }
}