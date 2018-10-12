import * as React from "react";
import * as Helpers from "./helpers";
import { FuelType, FuelPrice, GasPriceChanger } from "./Fuel";
import { MileageChanger, MonthChanger } from "./GraphControls";
import { Tabs } from "./Tabs";
import { Table } from "./Table";
import { Car, CarList } from "./Car";
declare var c3: any;
declare var d3: any;

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

// Overall controller for all other components
export interface MpgCalculatorProps {
    data: Array<Car>;
};

export interface MpgCalculatorState {
    data: Array<Car>;
    ppg: FuelPrice;
    months: number;
    annualMileage: number;
    activeTab: string;
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
            annualMileage: 12000,
            activeTab: "Chart"
        };

        this.updateGasPrice = this.updateGasPrice.bind(this);
        this.updateMileage = this.updateMileage.bind(this);
        this.updateMonths = this.updateMonths.bind(this);
        this.addCar = this.addCar.bind(this);
        this.removeAll = this.removeAll.bind(this);
        this.removeCar = this.removeCar.bind(this);
        this.setActive = this.setActive.bind(this);
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
        // Returns false if car with same name already exists

        for (let i in this.state.data) {
            if (this.state.data[i].name == data.name) {
                return false;
            }
        }

        var temp = this.state.data;
        temp.push(data);
        
        this.setState({
            data: temp
        });

        return true;
    }

    removeAll() {
        // Remove all car listings
        this.setState({ data: [] });
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

    setActive(name: string) {
        this.setState({
            activeTab: name
        });
    }
    
    render() {
        const tabItems: Array<string> = [
            "Chart", "Table"
        ];

        let body;
        
        if (this.state.activeTab == "Chart") {
            body = <div>
                <Graph
                    annualMileage={this.state.annualMileage}
                    months={this.state.months}
                    data={this.state.data}
                    ppg={this.state.ppg}
                />
                <div style={{
                    width: '100%',
                    display: 'flex',
                    alignContent: 'space-around',
                    flexDirection: 'row'
                }}>
                    <div style={{ width: '72.5%' }}>
                        <MileageChanger mileage={this.state.annualMileage} updateMileage={this.updateMileage} />
                    </div>
                    <div style={{width: '22.5%'}}>
                        <MonthChanger months={this.state.months} updateMonths={this.updateMonths} />
                    </div>
                </div>
            </div>;
        } else {
            body = <Table
                annualMileage={this.state.annualMileage}
                months={this.state.months}
                data={this.state.data}
                ppg={this.state.ppg}
            />;
        }

        return <div className="container-fluid">
            <h1>Automobile Cost Calculator</h1>

            <div className="row">
                <div className="col">
                    <div className="card" id="graph-panel">
                        <div className="card-header">
                            <Tabs items={tabItems}
                                activeItem={this.state.activeTab}
                                setActive={this.setActive}
                            />
                        </div>
                        <div className="card-body">
                            {body}
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <GasPriceChanger ppg={this.state.ppg} updateGasPrice={this.updateGasPrice} />
                    <CarList data={this.state.data}
                        addCar={this.addCar}
                        removeAll={this.removeAll}
                        removeCar={this.removeCar} />
                </div>
            </div>
        </div>
    }
}