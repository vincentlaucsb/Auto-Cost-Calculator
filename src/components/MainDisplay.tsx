import * as React from "react";
import { Tabs } from "./Tabs";
import { Table } from "./Car/Table";
import { CarDatabase } from "./CarDatabase";
import { FuelPrice } from "./Fuel";

interface MainDisplayProps {
    data: CarDatabase;
    ppg: FuelPrice;
}

interface MainDisplayState {
    activeTab: string;
    months: number;
    annualMileage: number;
}

export default class MainDisplay extends React.Component<MainDisplayProps, MainDisplayState> {
    constructor(props: MainDisplayProps) {
        super(props);

        this.state = {
            activeTab: "Chart",
            months: 48,
            annualMileage: 12000
        };

        this.updateMileage = this.updateMileage.bind(this);
        this.updateMonths = this.updateMonths.bind(this);
        this.setActive = this.setActive.bind(this);
    }

    getChart() {
        const Graph = React.lazy(() => import("./charts/Graph"));
        const MileageChanger = React.lazy(() => import("./charts/MileageChanger"));
        const MonthChanger = React.lazy(() => import("./charts/MonthChanger"));

        return <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <React.Suspense fallback={<div>Loading...</div>}>
                <Graph
                    data={this.makeGraphData()}
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
                    <div style={{ width: '22.5%' }}>
                        <MonthChanger months={this.state.months} updateMonths={this.updateMonths} />
                    </div>
                </div>
            </React.Suspense>
        </div>;
    }

    makeGraphData(): Map<string, Array<object>> {
        let cars = this.props.data.toArray();

        // a mapping of car names to arrays of (x, y) pairs
        let data = new Map<string, Array<object>>();

        for (let i in cars) {
            let car = cars[i];

            // An array of car costs, site-indexed by month
            let costs = [];

            for (var j = 0; j < this.state.months; j++) {
                costs.push({
                    x: j,
                    y: car.costToDriveMonth(this.state.annualMileage / 12, j, this.props.ppg)
                });
            }

            data.set(car.name, costs);
        }

        return data;
    }

    updateMileage(mileage: number) {
        this.setState({
            annualMileage: mileage
        });
    }

    updateMonths(numMonths: number) {
        this.setState({
            months: numMonths
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
            body = this.getChart();
        } else {
            body = <Table
                annualMileage={this.state.annualMileage}
                months={this.state.months}
                data={this.props.data}
                ppg={this.props.ppg}
            />; 
        }

        return <div className="card" id="graph-panel" style={{ height: "100%" }}>
            <div className="card-header">
                <Tabs items={tabItems}
                    activeItem={this.state.activeTab}
                    setActive={this.setActive}
                />
            </div>
            <div className="card-body">
                {body}
            </div>
        </div>;
    }
}