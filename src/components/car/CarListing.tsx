import * as React from "react";
import { Car } from "./Car";
import { fuelString, FuelType, FuelPrice } from "../Fuel";
import { Button } from "../Buttons";
import { DeleteConfirm } from "../DeleteConfirm";

interface ListingState {
    carData: Car;
    isEditable: boolean;
}

interface ListingProps {
    data: Car;
    removeCar: (car: String) => void;
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
    }

    updateMpg(event) {
        let newCarData = this.state.carData;
        newCarData.mpg = event.target.value;

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
                <span>Price: <input value={this.state.carData.price}></input></span>
                <span>Fuel Type: {fuelString(this.state.carData.fuelType)}</span>
                <span>Insurance: <input value={this.state.carData.insurance}></input></span>
                <span>Registration: <input value={this.state.carData.registration}></input></span>
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