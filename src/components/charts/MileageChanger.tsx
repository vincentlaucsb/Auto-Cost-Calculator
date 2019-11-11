import * as React from "react";

class MileageChangerProps {
    mileage: number;
    updateMileage: any;
}

export default class MileageChanger extends React.Component<
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