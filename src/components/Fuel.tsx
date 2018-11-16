import * as React from "react";
import { Modal } from "./Modal";
import { InfoBox } from "./InfoBox";

export enum FuelType {
    regular,
    mid,
    premium,
    diesel
}

export function fuelString(type: FuelType) {
    switch (type) {
        case FuelType.regular:
            return "Regular (87)";
        case FuelType.mid:
            return "Mid-Grade (89)";
        case FuelType.premium:
            return "Premium (92)";
        case FuelType.diesel:
            return "Diesel";  
    }
}

export type FuelPrice = Map<FuelType, number>;

interface GasPriceProps {
    ppg: FuelPrice;   // change
    updateGasPrice: any; // change
}

class GasPriceChangerRow extends React.Component<
    {id: FuelType, fuelPrice: string, onChange: any} ,{}
>    {
    render() {
        return <div className="form-group row">
            <label
                htmlFor={this.props.id.toString()}
                className="col-sm col-form-label">
                {fuelString(this.props.id)}
            </label>
            <div className="col-sm-8">
                <input className="form-control"
                    name={fuelString(this.props.id)}
                    type="number"
                    step="0.01"
                    min="0"
                    id={this.props.id.toString()}
                    onChange={this.props.onChange}
                    value={this.props.fuelPrice}
                />
            </div>
        </div>
    }
}

interface GasPriceState {
    updateable: boolean;
    ppg: FuelPrice;
    temp_ppg: Map<FuelType, string>;
}

export class GasPriceChanger extends React.Component<
    GasPriceProps, GasPriceState> {
    constructor(props: GasPriceProps) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            updateable: false,
            ppg: props.ppg,
            temp_ppg: new Map([
                [FuelType.regular, props.ppg.get(0).toString()],
                [FuelType.mid, props.ppg.get(1).toString()],
                [FuelType.premium, props.ppg.get(2).toString()],
                [FuelType.diesel, props.ppg.get(3).toString()]
            ]),
        };
    }

    onChange(event) {
        var temp = this.state.temp_ppg;
        let targetKey: FuelType = parseInt(event.target.id);
        temp.set(targetKey, event.target.value);

        this.setState({
            updateable: true,
            temp_ppg: temp
        });
    }

    handleSubmit(event) {
        /* "Update" button pressed */

        // Pass updated prices back up to MpgCalculator
        let newPpg: FuelPrice = new Map([
            [FuelType.regular, parseFloat(this.state.temp_ppg.get(FuelType.regular))],
            [FuelType.mid, parseFloat(this.state.temp_ppg.get(FuelType.mid))],
            [FuelType.premium, parseFloat(this.state.temp_ppg.get(FuelType.premium))],
            [FuelType.diesel, parseFloat(this.state.temp_ppg.get(FuelType.diesel))]
        ]);

        this.props.updateGasPrice(newPpg);
        event.preventDefault(); // Prevent submit from reloading page

        // Disable update button
        this.setState({
            updateable: false
        });
    }

    render() {
        let updateButton;
        if (this.state.updateable)
            updateButton = <button
                type="submit"
                className="btn btn-primary">Update</button>;
        else
            updateButton = <button
                className="btn btn-primary disabled" disabled>Update</button>;

        return (
            <div className="card">
                <div className="card-header">
                    Price of Gas <InfoBox
                        title="Good to Know: Fuel">
                        <p>
                            While there may be benefits to using mid-grade (sometimes labelled "Plus") or premium fuel,
                            most consumer vehicles in the US will run just fine on regular unleaded. Generally speaking,
                            it is best to follow the recommendations in your owner's manual.
                        </p>
                    </InfoBox>
                </div>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                    <GasPriceChangerRow
                        id={FuelType.regular}
                        fuelPrice={this.state.temp_ppg.get(FuelType.regular)}
                        onChange={this.onChange} />
                    <GasPriceChangerRow
                        id={FuelType.mid}
                        fuelPrice={this.state.temp_ppg.get(FuelType.mid)}
                        onChange={this.onChange}
                    />
                    <GasPriceChangerRow
                        id={FuelType.premium}
                        fuelPrice={this.state.temp_ppg.get(FuelType.premium)}
                        onChange={this.onChange}
                    />
                    <GasPriceChangerRow
                        id={FuelType.diesel}
                        fuelPrice={this.state.temp_ppg.get(FuelType.diesel)}
                        onChange={this.onChange}
                        />

                    {updateButton}
                    </form>
                    </div>
            </div>
        );
    }
}