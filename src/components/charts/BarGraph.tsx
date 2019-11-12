import * as React from "react";
import { ResponsiveBar } from "@nivo/bar";

export default class BarGraph extends React.Component {
    render() {
        let data = [
            {
                "country": "AD",
                "hot dog": 85,
                "hot dogColor": "hsl(310, 70%, 50%)",
                "burger": 106,
                "burgerColor": "hsl(96, 70%, 50%)",
                "sandwich": 10,
                "sandwichColor": "hsl(189, 70%, 50%)",
                "kebab": 146,
                "kebabColor": "hsl(200, 70%, 50%)",
                "fries": 36,
                "friesColor": "hsl(24, 70%, 50%)",
                "donut": 146,
                "donutColor": "hsl(80, 70%, 50%)"
            },
            {
                "country": "AE",
                "hot dog": 3,
                "hot dogColor": "hsl(318, 70%, 50%)",
                "burger": 89,
                "burgerColor": "hsl(248, 70%, 50%)",
                "sandwich": 40,
                "sandwichColor": "hsl(52, 70%, 50%)",
                "kebab": 36,
                "kebabColor": "hsl(110, 70%, 50%)",
                "fries": 0,
                "friesColor": "hsl(277, 70%, 50%)",
                "donut": 165,
                "donutColor": "hsl(155, 70%, 50%)"
            },
            {
                "country": "AF",
                "hot dog": 99,
                "hot dogColor": "hsl(253, 70%, 50%)",
                "burger": 101,
                "burgerColor": "hsl(235, 70%, 50%)",
                "sandwich": 78,
                "sandwichColor": "hsl(79, 70%, 50%)",
                "kebab": 87,
                "kebabColor": "hsl(148, 70%, 50%)",
                "fries": 37,
                "friesColor": "hsl(162, 70%, 50%)",
                "donut": 167,
                "donutColor": "hsl(31, 70%, 50%)"
            },
            {
                "country": "AG",
                "hot dog": 192,
                "hot dogColor": "hsl(29, 70%, 50%)",
                "burger": 137,
                "burgerColor": "hsl(116, 70%, 50%)",
                "sandwich": 97,
                "sandwichColor": "hsl(164, 70%, 50%)",
                "kebab": 137,
                "kebabColor": "hsl(160, 70%, 50%)",
                "fries": 94,
                "friesColor": "hsl(10, 70%, 50%)",
                "donut": 54,
                "donutColor": "hsl(342, 70%, 50%)"
            },
            {
                "country": "AI",
                "hot dog": 155,
                "hot dogColor": "hsl(296, 70%, 50%)",
                "burger": 180,
                "burgerColor": "hsl(356, 70%, 50%)",
                "sandwich": 10,
                "sandwichColor": "hsl(95, 70%, 50%)",
                "kebab": 14,
                "kebabColor": "hsl(281, 70%, 50%)",
                "fries": 102,
                "friesColor": "hsl(305, 70%, 50%)",
                "donut": 41,
                "donutColor": "hsl(62, 70%, 50%)"
            },
            {
                "country": "AL",
                "hot dog": 124,
                "hot dogColor": "hsl(293, 70%, 50%)",
                "burger": 87,
                "burgerColor": "hsl(29, 70%, 50%)",
                "sandwich": 2,
                "sandwichColor": "hsl(52, 70%, 50%)",
                "kebab": 168,
                "kebabColor": "hsl(60, 70%, 50%)",
                "fries": 136,
                "friesColor": "hsl(54, 70%, 50%)",
                "donut": 177,
                "donutColor": "hsl(318, 70%, 50%)"
            },
            {
                "country": "AM",
                "hot dog": 129,
                "hot dogColor": "hsl(295, 70%, 50%)",
                "burger": 196,
                "burgerColor": "hsl(247, 70%, 50%)",
                "sandwich": 81,
                "sandwichColor": "hsl(141, 70%, 50%)",
                "kebab": 148,
                "kebabColor": "hsl(214, 70%, 50%)",
                "fries": 87,
                "friesColor": "hsl(272, 70%, 50%)",
                "donut": 140,
                "donutColor": "hsl(71, 70%, 50%)"
            }
        ];

        return <ResponsiveBar
            data={data}
            keys={['hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut']}
            indexBy="country"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            colors={{ scheme: 'nivo' }}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: '#38bcb2',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: '#eed312',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            fill={[
                {
                    match: {
                        id: 'fries'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'sandwich'
                    },
                    id: 'lines'
                }
            ]}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'country',
                legendPosition: 'middle',
                legendOffset: 32
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'food',
                legendPosition: 'middle',
                legendOffset: -40
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            legends={[
                {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
        />
    }
}