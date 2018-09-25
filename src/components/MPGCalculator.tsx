import * as React from "react";
import * as Helpers from "./helpers";
declare var c3: any;
declare var d3: any;

export enum FuelType {
    regular,
    mid,
    premium,
    diesel
}

interface FuelPrice {
    regular: number;
    mid: number;
    premium: number;
    diesel: number;
}

export interface Car {
    name: string;
    price: number;
    mpg: number;
    insurance: number;
    fuelType: FuelType;
}

interface GraphProps {
    months: number;
    ppg: number;
    data: Array<Car>;
}

interface GraphData {
    x: string;
    columns: Array< Array<number|string> >;
};

class Graph extends React.Component<GraphProps> {
    componentDidMount() {
        // Force a render() call which will allow chart to show up
        // Without this, react will call c3.generate() before #chart has been created,
        // meaning that there is no HTML dom element to bind graph to, so it won't show.
        this.updateChart();
    }

    updateChart() {
        c3.generate({
            bindto: '#chart',
            data: this.makeData(this.props.data),
            axis: {
                x: {
                    label: 'Months Driven'
                },
                y: {
                    label: 'Cost'
                }
            }
        });
    }
    
    makeData(data: Array<Car>) {
        // Process car data and generate cost of ownership
        let graphData: GraphData = {
            x: 'x', // Mile increments
            columns: [
                Array<number | string>('x').concat(
                    Helpers.range(0, this.props.months)),
            ]
        };
        
        for (var i in data) {
            let cost: Array<any> = [
                data[i].name
            ];
            
            // Cost of car at months[j] months
            // parseFloat() needed to avoid string errors
            for (var m = 0; m < this.props.months; m++) {
                cost.push(
                    data[i].price +
                    ((m * 1000)/data[i].mpg * this.props.ppg)
                );
            }
            
            graphData.columns.push(cost);
        }
        
        return graphData;
    }
    
    render() {
        this.updateChart();

        return <div className="col">
            <div id="chart"></div>
        </div>
    }
}

interface CarListingProps {
    data: Car;
    removeCar: any; // Fix later
}

function CarListing(props: CarListingProps) {
    return (<li className="list-group-item">
    {props.data.name} 
    <FuelBadge fuel={props.data.fuelType} />
    <a onClick={props.removeCar}>[Remove]</a>
    </li>);
}

function FuelBadge(props: { fuel: FuelType }) {
    var background = {
        backgroundColor: 'red',
        display: 'inline-block'
    };

    let symbol: string = "87";

    console.log(props);

    switch (props.fuel) {
        case FuelType.regular:
            background.backgroundColor = 'red';
            symbol = "87";
            break;
        case FuelType.mid:
            background.backgroundColor = 'yellow';
            symbol = "89";
            break;
        case FuelType.premium:
            background.backgroundColor = 'blue';
            symbol = "92";
            break;
        case FuelType.diesel:
            background.backgroundColor = 'green';
            symbol = "D";
            break;
        default:
            break;
    }
   
    return <div style={background}>{symbol}</div>
}

interface CarListProps {
    data: Array<Car>;
    removeCar: any; // fix later
};

class CarList extends React.Component<CarListProps> {
    render() {
        return <div>
            <ul className="list-group">
            { this.props.data.map((i) => <CarListing data={i} removeCar={this.props.removeCar.bind(this, i.name)} />)}
            </ul>
        </div>
    }
}

interface CarAdderProps {
    addCar: any; // fix later
}

class CarAdder extends React.Component<CarAdderProps, Car> {
    constructor(props: CarAdderProps) {
        super(props);
        
        // Default values for new cars
        this.state = {
            'name': null,
            'mpg': null,
            'price': 0,
            'fuelType': FuelType.regular,
            'insurance': null
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addCar = this.addCar.bind(this);
    }
    
    addCar(state) {
        this.props.addCar(state);
    }
    
    handleChange(event) {
        // Update state to reflect input values
        let temp: Car = this.state;
        let new_value: any = event.target.value;

        // TODO: Might want to revise second condition
        if (event.target.type == "number" || !isNaN(event.target.value)) {
            new_value = parseFloat(new_value);
        }

        temp[event.target.id] = new_value;
        this.setState(temp);
    }
    
    handleSubmit(event) {
        this.addCar(this.state);
        event.preventDefault(); // Stop reloading page
    }
    
    render() {
        return <div>
            <h3>Add a Vehicle</h3>
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>Name
                        <input className="form-control" name="Name" id="name" onChange={this.handleChange} />
                    </label>
                </div>
                <div className="form-group">
                    <label>Fuel Type
                        <select className="form-control" name="Fuel Type" id="fuelType" onChange={this.handleChange}>
                            <option value={FuelType.regular}>Regular (87)</option>
                            <option value={FuelType.mid}>Mid-Grade (89)</option>
                            <option value={FuelType.premium}>Premium (92)</option>
                            <option value={FuelType.diesel}>Diesel</option>
                        </select>
                    </label>
                </div>
                <div className="form-group">
                    <label>Price
                        <input className="form-control" type="number" name="Price" id="price" onChange={this.handleChange} />
                    </label>
                </div>
                <div className="form-group">
                    <label>MPG
                        <input className="form-control" type="number" name="MPG" id="mpg" onChange={this.handleChange} />
                    </label>
                </div>
                <div className="">
                    <label>
                        Insurance
                    </label>
                </div>
                <div className="form-group">
                    <label>Vehicle Registration
                        <input className="form-control" type="number" name="MPG" id="mpg" onChange={this.handleChange} />
                    </label>
                </div>
                <button type="submit" className="btn btn-primary">Add</button>
            </form>
        </div>
    }
}

interface GasPriceProps {
    ppg: number;   // change
    onChange: any; // change
}

class GasPrice extends React.Component<GasPriceProps> {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {

    }

    render() {
        return (
            <div>
                <h2>Price of Gas</h2>
                <input name="Regular" onChange={this.props.onChange} />
                <input name="Mid-Grade" onChange={this.props.onChange} />
                <input name="Premium" onChange={this.props.onChange} />
                <input name="Diesel" onChange={this.props.onChange} />
            </div>
        );
    }
}

// Overall controller for all other components
export interface MpgCalculatorProps {
    data: Array<Car>;
};

export interface MpgCalculatorState {
    data: Array<Car>;
    ppg: number;
    months: number;
};

export class MpgCalculator extends React.Component<MpgCalculatorProps, MpgCalculatorState> {
    constructor(props: MpgCalculatorProps) {
        super(props);
        
        this.state = {
            data: props.data,
            ppg: 3,
            months: 48
        };
        
        this.updateGasPrice = this.updateGasPrice.bind(this);
        this.addCar = this.addCar.bind(this);
        this.removeCar = this.removeCar.bind(this);
    }
    
    updateGasPrice(event) {
        this.setState({
            ppg: event.target.value
        });
    }
    
    addCar(data: Car) {
        // Add car listing        
        var temp = this.state.data;
        temp.push(data);
        
        this.setState({
            data: temp
        });
    }
    
    removeCar(name: string) {
        // Remove car listings by name
        var temp = [];
        
        for (var j in this.state.data) {
            if (name != this.state.data[j].name) {
                temp.push(this.state.data[j]);
            }
        }

        this.setState({
            data: temp
        });
    }
    
    render() {
        return <div className="container-fluid">
            <div className="row">
                <Graph
                    months={this.state.months}
                    data={this.state.data} ppg={this.state.ppg} />
                <div className="col">
                    <h2>Vehicles</h2>
                    <CarList data={this.state.data} removeCar={this.removeCar} />
                    <CarAdder addCar={this.addCar} />
                </div>
            </div>
            <GasPrice ppg={this.state.ppg} onChange={this.updateGasPrice} />
        </div>
    }
}