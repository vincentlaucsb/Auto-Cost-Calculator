import * as React from "react";

import { FlexibleXYPlot, XAxis, YAxis, DiscreteColorLegend, HorizontalGridLines, LineSeries } from 'react-vis';

interface GraphProps {
    data: Map<string, Array<object>>;
}

export class Graph extends React.Component<GraphProps> {
    render() {
        let series = Array.from(this.props.data.entries());
        let keys = Array.from(this.props.data.keys());
        console.log(keys);

        return <React.Fragment>
            <FlexibleXYPlot
            title="Cost of Ownership"
            margin={{
                left: 50,
                right: 10,
                top: 10,
                bottom: 10
            }}>

            <HorizontalGridLines />
            {series.map(kv => (
                <LineSeries
                    key={kv[0]}
                    data={kv[1]}
               />
            ))}
            <XAxis />
            <YAxis />
        </FlexibleXYPlot>
        <DiscreteColorLegend items={keys} />
        </React.Fragment>
    }
}