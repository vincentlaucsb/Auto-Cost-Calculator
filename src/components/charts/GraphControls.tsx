import * as React from "react";

interface MonthChangerProps {
    months: number;
    updateMonths: any;
}

export class MonthChanger extends React.Component<MonthChangerProps, { months: number }> {
    constructor(props) {
        super(props);

        this.state = {
            months: this.props.months
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const _months = event.target.value;

        this.setState({
            months: _months
        });

        this.props.updateMonths(_months);
    }

    render() {
        return <form>
            <input className="form-control" name="Months" id="months"
                min="0"
                step="1"
                type="number"
                value={this.state.months}
                onChange={this.handleChange}
            />
            <label htmlFor="months" className="col-sm col-form-label">
                <b>Months to Show</b>
            </label>
        </form>
    }
}

class MileageChangerProps {
    mileage: number;
    updateMileage: any;
}

export class MileageChanger extends React.Component<
    MileageChangerProps, { mileage: number }> {
    constructor(props) {
        super(props);

        this.state = {
            mileage: 12000
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const _mileage = event.target.value;

        this.setState({
            mileage: _mileage
        });

        this.props.updateMileage(_mileage);
    }

    render() {
        return <form>
            <input className="form-control" name="Mileage" id="mileage"
                min="0"
                max="100000"
                type="range"
                value={this.state.mileage}
                onChange={this.handleChange}
            />
            <label htmlFor="mileage" className="col-sm col-form-label">
                <b>Miles Per: </b>
                Year: {this.state.mileage} &nbsp;
                Month: {Math.round(this.state.mileage / 12)} &nbsp;
                Day: {Math.round(this.state.mileage / 365)} 
            </label>
        </form>
    }
}