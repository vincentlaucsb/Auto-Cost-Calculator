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

    // Function for formatting the output string
    formatter?: (value: any) => string;
}

type NumberFieldProps = FieldProps<number>;

export class NumberField extends React.Component<NumberFieldProps, {}> {
    render() {
        if (this.props.isEditable) {
            return (
                <span>{this.props.label}:
                    <input
                        className="form-control form-control-sm"
                        name={this.props.fieldName}
                        type="number"
                        value={this.props.value}
                        onChange={this.props.onChange}
                    />
                </span>
            );
        }

        var displayText: any = this.props.value;
        if ('formatter' in this.props) {
            displayText = this.props.formatter(displayText);
        }

        return (
            <span>{this.props.label}: {displayText}</span>
        );
    }
}

interface GasFieldProps extends FieldProps<FuelType> {
    options: Map<any, string>;
}

export class GasField extends React.Component<GasFieldProps, {}> {
    render() {
        if (this.props.isEditable) {
            return (
                <span>{this.props.label}:
                    <select
                        className="custom-select custom-select-sm"
                        name={this.props.fieldName}
                        onChange={this.props.onChange}
                        defaultValue={this.props.value.toString()}
                    >
                        {Array.from(this.props.options).map((i) =>
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