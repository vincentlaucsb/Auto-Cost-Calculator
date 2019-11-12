import * as React from "react";
import { saveAs } from 'file-saver';
import { ModalContainer, Modal } from "./Modal";
import { Responsive, WidthProvider } from 'react-grid-layout';

import { FuelPrice, GasPriceChanger, FuelType } from "./Fuel";

import { CarDatabase } from "./CarDatabase";
import { Car } from "./Car/Car";
import { CarList as CarList } from "./Car/List";
import ActionBar from "./ActionBar";
import { IJsonSerializable } from "./IJsonSerializable";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

// Key of the localStorage entry that Auto Cost Calculator save data will be stored
const LocalStorageKey = "autoCostData";

const DefaultData = {
    data: [
        {
            'name': '2018 Ford F-150',
            'mpg': 23,
            'price': 27705,
            'fuelType': FuelType.regular,
            'insurance': 0,
            'registration': 0
        },
        {
            'name': '2018 Chevrolet Silverado 1500',
            'mpg': 21,
            'price': 28300,
            'fuelType': FuelType.regular,
            'insurance': 0,
            'registration': 0
        },
        {
            'name': '2018 Ram 1500',
            'mpg': 23,
            'price': 27295,
            'fuelType': FuelType.regular,
            'insurance': 0,
            'registration': 0
        },
        {
            'name': '2018 Toyota RAV4',
            'mpg': 26,
            'price': 24660,
            'fuelType': FuelType.regular,
            'insurance': 0,
            'registration': 0
        },
        {
            'name': '2018 Nissan Rogue',
            'mpg': 29,
            'price': 24800,
            'fuelType': FuelType.regular,
            'insurance': 0,
            'registration': 0
        },
        {
            'name': '2018 Toyota Camry',
            'mpg': 34,
            'price': 23645,
            'fuelType': FuelType.regular,
            'insurance': 0,
            'registration': 0
        }],

    ppg: {
        0: 2.87, // Regular
        1: 3.15, // Mid
        2: 3.4,  // Premium
        3: 3.18  // Diesel
    }
};

interface AutoCostCalcProps {
    data: CarDatabase;
    ppg: FuelPrice;
};

interface AutoCostCalcState extends AutoCostCalcProps{
    modalsVisible: Map<string, boolean>;
};

export default class AutoCostCalculator extends React.Component<AutoCostCalcProps, AutoCostCalcState>
    implements IJsonSerializable {

    static defaultProps = {
        data: new CarDatabase(),
        ppg: new FuelPrice()
    };

    dynamicComponents: object;
    modalRef: any;

    constructor(props: AutoCostCalcProps) {
        super(props);

        this.state = {
            data: props.data,
            ppg: props.ppg,
            modalsVisible: new Map([
                ['carAdder', false]
            ])
        };

        // Attempt to retrieve past session data
        const savedData = localStorage.getItem(LocalStorageKey);
        if (savedData != null) {
            this.load(JSON.parse(savedData));
        } else {
            this.state.ppg.load(DefaultData['ppg']);
            this.state.data.load(DefaultData['data']);
        }

        this.updateCar = this.updateCar.bind(this);
        this.updateGasPrice = this.updateGasPrice.bind(this);
        this.addCar = this.addCar.bind(this);
        this.removeAll = this.removeAll.bind(this);
        this.removeCar = this.removeCar.bind(this);
        this.undoChanges = this.undoChanges.bind(this);
        this.reset = this.reset.bind(this);
        this.save = this.save.bind(this);
        this.load = this.load.bind(this);
        this.dump = this.dump.bind(this);
        this.saveFile = this.saveFile.bind(this);
    }
    
    updateGasPrice(_ppg: FuelPrice) {
        this.setState({
            ppg: _ppg
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

    // Reset any changes made since the last save state
    undoChanges() {
        let jsonData = localStorage.getItem(LocalStorageKey);
        this.load(JSON.parse(jsonData));
    }

    // Restore original defaults
    reset() {
        this.load(DefaultData);
        this.save();
    }

    // Load previously saved data stored in a JSON format
    load(data: object) {
        let ppg = new FuelPrice();
        ppg.load(data['ppg']);

        let cars = new CarDatabase();
        cars.load(data['data']);

        this.setState({
            ppg: ppg,
            data: cars
        });

        this.save();
    }

    // Dump the current state in JSON format
    dump(): object {
        let jsonData = {};
        jsonData['ppg'] = this.state.ppg.dump();
        jsonData['data'] = this.state.data.dump();
        return jsonData;
    }

    // Save the auto cost calculator's state to local storage
    save() {
        localStorage.setItem(LocalStorageKey, JSON.stringify(this.dump()));
    }

    // Save data to an external file
    saveFile() {
        var blob = new Blob([JSON.stringify(this.dump())],
            {
                type: "text/plain;charset=utf-8"
            }
        );

        // TODO: Allow user to change filename
        saveAs(blob, "auto-cost-data.json");
    }

    render() {
        // Grid
        var layouts = {
            lg: [
                { i: 'a', x: 0, y: 0, w: 20, h: 30 },
                { i: 'gas', x: 20, y: 0, w: 10, h: 16 },
                { i: 'c', x: 20, y: 2, w: 10, h: 40 }
            ]
        };

        let MainDisplay = React.lazy(() => import("./MainDisplay"));

        return <React.Fragment>
            <ModalContainer />
            <div className="container-fluid">
                <h1>Automobile Cost Calculator</h1>

                <ActionBar
                    loadData={this.load}
                    undoChanges={this.undoChanges}
                    reset={this.reset}
                    save={this.save}
                    saveFile={this.saveFile}
                />

                <ResponsiveReactGridLayout className="layout" layouts={layouts}
                    breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                    cols={{ lg: 30, md: 30, sm: 6, xs: 4, xxs: 2 }}

                    rowHeight={10}

                    // Make Bootstrap card headers the handle for drap/drop
                    draggableHandle="div.card-header"

                    // verticalCompact={false}
                >
                    <div key="a">
                        <React.Suspense fallback={<div>Loading...</div>}>
                        <MainDisplay data={this.state.data} ppg={this.state.ppg} />
                        </React.Suspense>
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