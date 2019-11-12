import * as React from "react";

interface MonthChangerProps {
    months: number;
    updateMonths: (numMonths: number) => void;
}

export default class MonthChanger extends React.Component<MonthChangerProps> {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const months = event.target.value;
        this.props.updateMonths(months);
    }

    render() {
        return <form>
            <input className="form-control" name="Months" id="months"
                min="0"
                step="1"
                type="number"
                value={this.props.months}
                onChange={this.handleChange}
            />
            <label htmlFor="months" className="col-sm col-form-label">
                <b>Months to Show</b>
            </label>
        </form>
    }
}