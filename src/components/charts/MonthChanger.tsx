import * as React from "react";

interface MonthChangerProps {
    months: number;
    updateMonths: any;
}

export default class MonthChanger extends React.Component<MonthChangerProps, { months: number }> {
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