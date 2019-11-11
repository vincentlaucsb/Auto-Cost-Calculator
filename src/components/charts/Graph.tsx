import * as React from "react";

import { FlexibleXYPlot, XAxis, YAxis, DiscreteColorLegend, HorizontalGridLines, LineSeries } from 'react-vis';

interface GraphProps {
    data: Map<string, Array<object>>;
}

export class Graph extends React.Component<GraphProps> {
    render() {
        let series = Array.from(this.props.data.entries());

        return <FlexibleXYPlot
            title="Cost of Ownership">
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
        </FlexibleXYPlot>;
    }
}