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
                <label>Annual Mileage
                    <input className="form-control" name="Mileage" id="mileage"
                        min="0"
                        max="100000"
                        type="range"
                        value={this.state.mileage}
                        onChange={this.handleChange}
                    />
                    <p>{this.state.mileage}<br />
                        {Math.round(this.state.mileage / 12)} miles/month<br />
                        {Math.round(this.state.mileage / 365)} miles/day<br />
                        </p>
                </label>
            </div>
        </form>
    }
}