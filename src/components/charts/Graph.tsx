import * as React from "react";
import { ResponsiveLine } from "@nivo/line";

interface GraphProps {
    data: Map<string, Array<object>>;
}

export default class Graph extends React.Component<GraphProps> {
    render() {
        let lineData = [];
        for (let [car, data] of this.props.data.entries()) {
            lineData.push({
                id: car,
                data: data
            });
        }

        return <ResponsiveLine
            data={lineData}
            margin={{
                top: 50,
                right: 200,
                bottom: 50,
                left: 50
            }}
            axisRight={null}
            axisTop={null}
            axisBottom={{
                legend: "Months"
            }}
            axisLeft={{
                legend: "Cost"
            }}

            curve="linear"
            xScale={{ type: 'linear' }}
            yScale={{
                type: 'linear',
                stacked: false
            }}

            enableSlices="x"

            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
        />
    }
}