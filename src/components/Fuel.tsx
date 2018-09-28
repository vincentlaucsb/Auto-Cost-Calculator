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
        // TODO: Refactor this
        return (
            <div className="form-group">
                <h2>Price of Gas</h2>
                <label>Regular
                    <input className="form-control" name="Regular" id={FuelType.regular.toString()}
                        onChange={this.onChange}
                        value={this.state.get(FuelType.regular)} />
                </label>
                <label>Mid-Grade
                    <input className="form-control" name="Mid-Grade" id={FuelType.mid.toString()}
                        onChange={this.onChange}
                        value={this.state.get(FuelType.mid)} />
                </label>
                <label>Premium
                    <input className="form-control" name="Premium" id={FuelType.premium.toString()}
                        onChange={this.onChange}
                        value={this.state.get(FuelType.premium)} />
                </label>
                <label>Diesel
                    <input className="form-control" name="Diesel" id={FuelType.diesel.toString()}
                        onChange={this.onChange}
                        value={this.state.get(FuelType.diesel)} />
                </label>
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
