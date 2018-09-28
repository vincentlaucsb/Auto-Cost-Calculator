import * as React from "react";

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
            <div className="form-group">
                <label htmlFor="mileage" className="col-sm col-form-label">
                    Annual Mileage</label>
                <div className="col-sm-8">
                <input className="form-control" name="Mileage" id="mileage"
                    min="0"
                    max="100000"
                    type="range"
                    value={this.state.mileage}
                    onChange={this.handleChange}
                />
                    <p><b>Miles Per</b>
                        Year: {this.state.mileage}
                        Month: {Math.round(this.state.mileage / 12)}
                        Day: {Math.round(this.state.mileage / 365)}
                    </p>
                </div>
            </div>
        </form>
    }
}