import * as React from "react";
import { Car } from "./Car";
import { fuelString, FuelType, FuelPrice } from "../Fuel";
import { DeleteConfirm } from "../DeleteConfirm";

interface ListingProps {
    data: Car;
    removeCar: (car: String) => void;
}

// An individual car listing
export function CarListing(props: ListingProps) {
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