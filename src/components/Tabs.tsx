// Tab controller and navigation

import * as React from "react";

interface TabItemProps {
    name: string;
    activeItem: string;
    setActive: any;
}

export class TabItem extends React.Component<TabItemProps> {
    render() {
        let className: string = "nav-link";
        if (this.props.activeItem == this.props.name) {
            className = "nav-link active";
        }

        return <li className="nav-item">
            <a
                className={className}
                onClick={this.props.setActive}
                data-name={this.props.name}
            >{this.props.name}</a>
        </li>;
    }
}

interface TabProps {
    items: Array<string>;
    activeItem: string;
    setActive: any;
}

export class Tabs extends React.Component<TabProps, { activeItem: string }> {
    constructor(props: TabProps) {
        super(props);
        this.state = {
            activeItem: this.props.activeItem
        };

        this.setActive = this.setActive.bind(this);
    }

    setActive(event) {
        const newTab: string = event.target.dataset.name;

        // pass name of new active tab back up
        this.props.setActive(newTab);
    }

    render() {
        return <ul className="nav nav-tabs card-header-tabs">
            {
                this.props.items.map((i) => <TabItem
                    name={i}
                    activeItem={this.props.activeItem}
                    setActive={this.setActive}
                />)
            }
        </ul>
    }
}