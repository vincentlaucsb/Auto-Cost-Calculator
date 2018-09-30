import * as React from "react";

export enum FuelType {
    regular,
    mid,
    premium,
    diesel
}

export type FuelPrice = Map<FuelType, number>;

interface GasPriceProps {
    ppg: FuelPrice;   // change
    updateGasPrice: any; // change
}

class GasPriceChangerRow extends React.Component<
    {id: FuelType, name: string, fuelPrice: string, onChange: any} ,{}
>    {
    render() {
        return <div className="form-group row">
            <label
                htmlFor={this.props.id.toString()}
                className="col-sm col-form-label">
                {this.props.name}
            </label>
            <div className="col-sm-8">
                <input className="form-control"
                    name={this.props.name}
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
                    Price of Gas
                </div>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                    <GasPriceChangerRow
                        id={FuelType.regular}
                        name="Regular"
                        fuelPrice={this.state.temp_ppg.get(FuelType.regular)}
                        onChange={this.onChange} />
                    <GasPriceChangerRow
                        id={FuelType.mid}
                        name="Mid-Grade"
                        fuelPrice={this.state.temp_ppg.get(FuelType.mid)}
                        onChange={this.onChange}
                    />
                    <GasPriceChangerRow
                        id={FuelType.premium}
                        name="Premium"
                        fuelPrice={this.state.temp_ppg.get(FuelType.premium)}
                        onChange={this.onChange}
                    />
                    <GasPriceChangerRow
                        id={FuelType.diesel}
                        name="Diesel"
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

export function FuelBadge(props: { fuel: FuelType }) {
    var background = {
        backgroundColor: 'yellow',
        display: 'inline-block'
    };

    let symbol: string;

    switch (props.fuel) {
        case FuelType.regular:
            symbol = "87";
            break;
        case FuelType.mid:
            symbol = "89";
            break;
        case FuelType.premium:
            symbol = "92";
            break;
        case FuelType.diesel:
            symbol = "D";
            break;
        default:
            break;
    }

    return <div style={background}>{symbol}</div>
}
