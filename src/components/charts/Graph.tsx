import * as React from "react";

import { XYPlot, XAxis, YAxis, DiscreteColorLegend, HorizontalGridLines, LineSeries } from 'react-vis';

interface GraphProps {
    data: Map<string, Array<object>>;
}

export class Graph extends React.Component<GraphProps> {
    render() {
        let series = Array.from(this.props.data.entries());

        return <XYPlot
            width={1000}
            height={500}>
            <HorizontalGridLines />
            {series.map(kv => (
                <LineSeries
                    key={kv[0]}
                    data={kv[1]}
               />
            ))}
            <DiscreteColorLegend
                items={[
                    {
                        title: "test"
                    }
                ]}
            />
            <XAxis />
            <YAxis />
        </XYPlot>;
    }
}