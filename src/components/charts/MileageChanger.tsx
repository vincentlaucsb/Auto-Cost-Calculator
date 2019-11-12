import * as React from "react";

class MileageChangerProps {
    mileage: number;
    updateMileage: (mileage: number) => void;
}

export default class MileageChanger extends React.Component<
    MileageChangerProps> {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const mileage = event.target.value;
        this.props.updateMileage(mileage);
    }

    render() {
        return <form>
            <input className="form-control" name="Mileage" id="mileage"
                min="0"
                max="100000"
                type="range"
                value={this.props.mileage}
                onChange={this.handleChange}
            />
            <label htmlFor="mileage" className="col-sm col-form-label">
                <b>Miles Per: </b>
                Year: {this.props.mileage} &nbsp;
                Month: {Math.round(this.props.mileage / 12)} &nbsp;
                Day: {Math.round(this.props.mileage / 365)}
            </label>
        </form>
    }
}