import * as React from "react";
import { saveAs } from 'file-saver';
import { ModalContainer, Modal } from "./Modal";
import { Responsive, WidthProvider } from 'react-grid-layout';

import { FuelPrice, GasPriceChanger } from "./Fuel";

import { CarDatabase } from "./CarDatabase";
import { Car } from "./Car/Car";
import { CarList as CarList } from "./Car/List";
import { Defaults } from "./Globals";
import { FileLoader } from "./FileLoader";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

// Key of the localStorage entry that Auto Cost Calculator save data will be stored
const LocalStorageKey = "autoCostData";

interface AutoCostCalcProps {
    data: CarDatabase;
    ppg: FuelPrice;
};

interface AutoCostCalcState extends AutoCostCalcProps{
    modalsVisible: Map<string, boolean>;
};

export class AutoCostCalculator extends React.Component<AutoCostCalcProps, AutoCostCalcState> {
    dynamicComponents: object;
    modalRef: any;

    constructor(props: AutoCostCalcProps) {
        super(props);

        let temp_modals_visible: Map<string, boolean> = new Map([
            ['carAdder', false]
        ]);
        
        this.state = {
            data: props.data,
            ppg: props.ppg,
            modalsVisible: temp_modals_visible
        };

        this.dynamicComponents = {};

        this.toJson = this.toJson.bind(this);
        this.updateCar = this.updateCar.bind(this);
        this.updateGasPrice = this.updateGasPrice.bind(this);
        this.addCar = this.addCar.bind(this);
        this.removeAll = this.removeAll.bind(this);
        this.removeCar = this.removeCar.bind(this);
        this.undoChanges = this.undoChanges.bind(this);
        this.reset = this.reset.bind(this);
        this.save = this.save.bind(this);
        this.loadData = this.loadData.bind(this);
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
        this.loadData(JSON.parse(jsonData));
    }

    // Restore original defaults
    reset() {
        let defaults = new Defaults();

        this.setState({
            data: defaults.cars(),
            ppg: defaults.ppg()
        });

        this.save();
    }

    // Load previously saved data stored in a JSON format
    loadData(data: object) {
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
    toJson(): object {
        let jsonData = {};
        jsonData['ppg'] = this.state.ppg.dump();
        jsonData['data'] = this.state.data.dump();
        return jsonData;
    }

    // Save the auto cost calculator's state to local storage
    save() {
        localStorage.setItem(LocalStorageKey, JSON.stringify(this.toJson()));
    }

    // Save data to an external file
    saveFile() {
        var blob = new Blob([JSON.stringify(this.toJson())],
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
        let saveControls = <div className="action-bar">
            <button className="btn btn-primary"
                onClick={this.undoChanges}>
                <img src="./img/undo-24px.svg" alt="Save" />
                Undo Changes
            </button>
            <Modal submit={{
                buttonName: "Load",
                formName: "loadFile"
            }}

                buttonProps={{
                    className: "btn-primary"
                }}

                triggerText="Load" title="Load">
                <FileLoader loadFile={this.loadData} />
            </Modal>
            <button
                className="btn btn-primary"
                onClick={this.save}>
                <img src="./img/save-24px.svg" alt="Save" /> Save</button>
            <button className="btn btn-primary"
                onClick={this.saveFile}
            >
                <img src="./img/file_copy-24px.svg" alt="Save" />
                Save to File</button>
            <button className="btn btn-primary"
                onClick={this.reset}
            >
                <img src="./img/refresh-24px.svg" alt="Save" />
                Restore Defaults</button>
        </div>

        return <React.Fragment>
            <ModalContainer />
            <div className="container-fluid">
                <h1>Automobile Cost Calculator</h1>

                {saveControls}

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