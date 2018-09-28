import * as React from "react";
import * as Helpers from "./helpers";
import { FuelType, FuelPrice, FuelBadge, GasPriceChanger } from "./Fuel";
import { MileageChanger } from "./Mileage";
import { MonthChanger } from "./GraphControls";
declare var c3: any;
declare var d3: any;

export interface Car {
    name: string;
    price: number;
    mpg: number;
    insurance: number;
    fuelType: FuelType;
}

interface GraphProps {
    months: number;
    annualMileage: number;
    ppg: FuelPrice;
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
            const car = data[i];
            const monthlyMileage = this.props.annualMileage / 12;

            let cost: Array<any> = [
                car.name
            ];
            
            // Cost of car at months[j] months
            // parseFloat() needed to avoid string errors
            for (var m = 0; m < this.props.months; m++) {
                cost.push(
                    car.price +
                    ((m * monthlyMileage) / car.mpg *
                        this.props.ppg.get(car.fuelType))
                );
            }
            
            graphData.columns.push(cost);
        }
        
        return graphData;
    }
    
    render() {
        this.updateChart();
        return <div id="chart"></div>
    }
}

interface CarListingProps {
    data: Car;
    removeCar: any; // Fix later
}

function CarListing(props: CarListingProps) {
    return (
        <li>
        {props.data.name} 
        <FuelBadge fuel={props.data.fuelType} /> 
        <button type="button" className="btn btn-danger btn-sm" onClick={props.removeCar}>x</button>
        </li>
    );
}

interface CarListProps {
    data: Array<Car>;
    removeCar: any; // fix later
};

class CarList extends React.Component<CarListProps> {
    render() {
        return <div>
            <ul>
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

// Overall controller for all other components
export interface MpgCalculatorProps {
    data: Array<Car>;
};

export interface MpgCalculatorState {
    data: Array<Car>;
    ppg: FuelPrice;
    months: number;
    annualMileage: number;
};

export class MpgCalculator extends React.Component<MpgCalculatorProps, MpgCalculatorState> {
    constructor(props: MpgCalculatorProps) {
        super(props);

        let temp_ppg: FuelPrice = new Map([
            [FuelType.regular, 2.87],
            [FuelType.mid, 3.15],
            [FuelType.premium, 3.4],
            [FuelType.diesel, 3.18]
        ]);
        
        this.state = {
            data: props.data,
            ppg: temp_ppg,
            months: 48,
            annualMileage: 12000
        };

        this.updateGasPrice = this.updateGasPrice.bind(this);
        this.updateMileage = this.updateMileage.bind(this);
        this.updateMonths = this.updateMonths.bind(this);
        this.addCar = this.addCar.bind(this);
        this.removeCar = this.removeCar.bind(this);
    }
    
    updateGasPrice(_ppg: FuelPrice) {
        this.setState({
            ppg: _ppg
        });
    }

    updateMileage(mileage: number) {
        this.setState({
            annualMileage: mileage
        });
    }

    updateMonths(_months: number) {
        this.setState({
            months: _months
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
            <h1>Automobile Cost Calculator</h1>
            <div className="row">
                <div className="col">
                    <MonthChanger months={this.state.months} updateMonths={this.updateMonths} />
                    <Graph
                        annualMileage={this.state.annualMileage}
                        months={this.state.months}
                        data={this.state.data}
                        ppg={this.state.ppg}
                    />
                    <MileageChanger mileage={this.state.annualMileage} updateMileage={this.updateMileage} />
                    <CarAdder addCar={this.addCar} />
                </div>
                <div className="col-4">
                    <h2>Vehicles</h2>
                    <CarList data={this.state.data} removeCar={this.removeCar} />
                    <GasPriceChanger ppg={this.state.ppg} updateGasPrice={this.updateGasPrice} />
                </div>
            </div>
        </div>
    }
}