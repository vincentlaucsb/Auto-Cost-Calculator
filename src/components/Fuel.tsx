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
    {id: FuelType, name: string, fuelPrice: number, onChange: any} ,{}
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
                    id={this.props.id.toString()}
                    onChange={this.props.onChange}
                    value={this.props.fuelPrice}
                />
            </div>
        </div>
    }
}

export class GasPriceChanger extends React.Component<GasPriceProps, FuelPrice> {
    constructor(props: GasPriceProps) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.state = props.ppg;
    }

    onChange(event) {
        this.state.set(parseInt(event.target.id), parseFloat(event.target.value));

        // Pass state back up to MpgCalculator
        this.props.updateGasPrice(this.state);
    }

    render() {
        return (
            <div className="card">
                <div className="card-header">
                    Price of Gas
                </div>
                <div className="card-body">
                    <form>
                    <GasPriceChangerRow
                        id={FuelType.regular}
                        name="Regular"
                        fuelPrice={this.state.get(FuelType.regular)}
                        onChange={this.onChange} />
                    <GasPriceChangerRow
                        id={FuelType.mid}
                        name="Mid-Grade"
                        fuelPrice={this.state.get(FuelType.mid)}
                        onChange={this.onChange}
                    />
                    <GasPriceChangerRow
                        id={FuelType.premium}
                        name="Premium"
                        fuelPrice={this.state.get(FuelType.premium)}
                        onChange={this.onChange}
                    />
                    <GasPriceChangerRow
                        id={FuelType.diesel}
                        name="Diesel"
                        fuelPrice={this.state.get(FuelType.diesel)}
                        onChange={this.onChange}
                    />
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

    let symbol: string = "87";

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
