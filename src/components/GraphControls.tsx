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
            <div className="form-group">
                <label>Max Months
                    <input className="form-control" name="Months" id="months"
                        min="0"
                        max="360"
                        type="range"
                        value={this.state.months}
                        onChange={this.handleChange}
                    />
                    <p>{this.state.months}</p>
                </label>
            </div>
        </form>
    }
}