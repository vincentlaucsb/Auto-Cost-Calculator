// Represents data fields that can alternate between
// display and editing modes

import * as React from "react";
import { FuelType } from "../Fuel";

interface FieldProps<ValueType> {
    label: string;
    value: ValueType;
    fieldName: string;
    isEditable: boolean;
    onChange?: (event: any) => void;
}

type NumberFieldProps = FieldProps<number>;

export class NumberField extends React.Component<NumberFieldProps, {}> {
    render() {
        if (this.props.isEditable) {
            return (
                <span>{this.props.label}:
                    <input
                        className="form-control"
                        name={this.props.fieldName}
                        type="number"
                        value={this.props.value}
                        onChange={this.props.onChange}
                    />
                </span>
            );
        }

        return (
            <span>{this.props.label}: {this.props.value}</span>
        );
    }
}

interface GasFieldProps extends FieldProps<FuelType> {
    options: Map<any, string>;
}

export class GasField extends React.Component<GasFieldProps, {}> {
    render() {
        let optionKvs = Array.from(this.props.options);

        if (this.props.isEditable) {
            return (
                <span>{this.props.label}:
                    <select
                        name={this.props.fieldName}
                        onChange={this.props.onChange}
                        defaultValue={this.props.value.toString()}
                    >
                        {optionKvs.map((i) =>
                            <option value={i[0]}>{i[1]}</option>)}
                    </select>
                </span>
            );
        }

        return (
            <span>{this.props.label}: {this.props.options.get(this.props.value)}</span>
        );
    }
}