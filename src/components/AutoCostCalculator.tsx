import * as React from "react";
import { saveAs } from 'file-saver';
import { ModalContainer, Modal } from "./Modal";
import { Responsive, WidthProvider } from 'react-grid-layout';

import * as Helpers from "./helpers";
import { FuelType, FuelPrice, GasPriceChanger } from "./Fuel";
import { MileageChanger, MonthChanger } from "./GraphControls";
import { Tabs } from "./Tabs";

import { Table } from "./Car/Table";
import { CarDatabase } from "./CarDatabase";
import { Car } from "./Car/Car";
import { CarList as CarList } from "./Car/List";
import { Defaults } from "./Globals";
import { FileLoader } from "./FileLoader";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

declare var c3: any;
declare var d3: any;

interface GraphProps {
    months: number;
    annualMileage: number;
    ppg: FuelPrice;
    data: CarDatabase;
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
    
    makeData(data: CarDatabase) {
        // Process car data and generate cost of ownership
        let graphData: GraphData = {
            x: 'x', // Mile increments
            columns: [
                Array<number | string>('x').concat(
                    Helpers.range(0, this.props.months)),
            ]
        };

        var cars = data.toArray();
        for (var i in cars) {
            const car = cars[i];
            const monthlyMileage = this.props.annualMileage / 12;

            let cost: Array<any> = [
                car.name
            ];
            
            // Cost of car at months[j] months
            for (var m = 0; m < this.props.months; m++) {
                cost.push(car.costToDriveMonth(
                    monthlyMileage, m, this.props.ppg));
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

interface AutoCostCalcProps {
    data: CarDatabase;
    ppg: FuelPrice;
};

interface AutoCostCalcState extends AutoCostCalcProps{
    months: number;
    annualMileage: number;
    activeTab: string;
    modalsVisible: Map<string, boolean>;
};

export class AutoCostCalculator extends React.Component<AutoCostCalcProps, AutoCostCalcState> {
    modalRef: any;

    constructor(props: AutoCostCalcProps) {
        super(props);

        let temp_modals_visible: Map<string, boolean> = new Map([
            ['carAdder', false]
        ]);
        
        this.state = {
            data: props.data,
            ppg: props.ppg,
            months: 48,
            annualMileage: 12000,
            activeTab: "Chart",
            modalsVisible: temp_modals_visible
        };

        this.updateCar = this.updateCar.bind(this);
        this.updateGasPrice = this.updateGasPrice.bind(this);
        this.updateMileage = this.updateMileage.bind(this);
        this.updateMonths = this.updateMonths.bind(this);
        this.addCar = this.addCar.bind(this);
        this.removeAll = this.removeAll.bind(this);
        this.removeCar = this.removeCar.bind(this);
        this.reset = this.reset.bind(this);
        this.setActive = this.setActive.bind(this);
        this.save = this.save.bind(this);
        this.loadFile = this.loadFile.bind(this);
        this.saveFile = this.saveFile.bind(this);
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

    // Add car listing
    addCar(data: Car) {
        this.state.data.addCar(data);
        this.setState({ data: this.state.data });
    }

    // Update an individual cars
    updateCar(id: number, data: Car) {
        this.state.data.updateCar(id, data);
        this.setState({ data: this.state.data });
    }

    // Remove all car listings
    removeAll() {
        this.state.data.removeAll();
        this.setState({ data: this.state.data });
    }

    // Remove an individual car
    removeCar(id: number) {
        this.state.data.removeCar(id);
        this.setState({ data: this.state.data });
    }

    setActive(name: string) {
        this.setState({
            activeTab: name
        });
    }

    // Reset the current calculator state
    reset() {
        let defaults = new Defaults();

        this.setState({
            data: defaults.cars(),
            ppg: defaults.ppg()
        });

        this.save();
    }

    // Save the auto cost calculator's state to local storage
    save() {
        let jsonData = { };
        jsonData['ppg'] = this.state.ppg.dump();
        jsonData['data'] = this.state.data.dump();

        // console.log(jsonData);
        // console.log(JSON.stringify(jsonData));
        localStorage.setItem('autoCostData', JSON.stringify(jsonData));
    }

    loadFile(data: object) {
        // console.log("GOT DATA", data);
        let ppg = new FuelPrice();
        ppg.load(data['ppg']);

        let cars = new CarDatabase();
        cars.load(data['data']);

        console.log("PPG", ppg);
        console.log("CARS", cars);

        this.setState({
            ppg: ppg,
            data: cars
        });

        console.log("STATE UPDATED");

        this.save();
    }

    saveFile() {
        let jsonData = {};
        jsonData['ppg'] = this.state.ppg.dump();
        jsonData['data'] = this.state.data.dump();

        var blob = new Blob([JSON.stringify(jsonData)],
            {
                type: "text/plain;charset=utf-8"
            }
        );

        saveAs(blob, "auto-cost-data.json");
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

        // Grid
        var layouts = {
            lg: [
                { i: 'a', x: 0, y: 0, w: 20, h: 30 },
                { i: 'gas', x: 20, y: 0, w: 10, h: 16 },
                { i: 'c', x: 20, y: 2, w: 10, h: 40 }
            ]
        };

        return <React.Fragment>
            <ModalContainer />
            <div className="container-fluid">
                <h1>Automobile Cost Calculator</h1>

                <button className="btn btn-primary"
                    onClick={this.reset}>
                    Reset</button>
                <button
                    className="btn btn-primary"
                    onClick={this.save}>
                    Save</button>
                <Modal submit={{
                    buttonName: "Load from File",
                    formName: "loadFile"
                }}

                    buttonProps={{
                        className: "btn-primary"
                    }}

                    triggerText="Load from File" title="Load from File">
                    <FileLoader loadFile={this.loadFile} />
                </Modal>
                <button className="btn btn-primary"
                    onClick={this.saveFile}
                >Save to File</button>

                <ResponsiveReactGridLayout className="layout" layouts={layouts}
                    breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                    cols={{ lg: 30, md: 30, sm: 6, xs: 4, xxs: 2 }}

                    rowHeight={10}

                    // Make Bootstrap card headers the handle for drap/drop
                    draggableHandle="div.card-header"

                    // verticalCompact={false}
                >
                    <div key="a">
                        <div className="card" id="graph-panel" style={{ height: "100%" }}>
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
                    <div key="gas">
                        <GasPriceChanger ppg={this.state.ppg} updateGasPrice={this.updateGasPrice} />
                    </div>
                    <div key="c">
                        <CarList data={this.state.data}
                            addCar={this.addCar}
                            updateCar={this.updateCar}
                            removeAll={this.removeAll}
                            removeCar={this.removeCar}
                        />
                    </div>
                </ResponsiveReactGridLayout>
            </div>
            </React.Fragment>
    }
}