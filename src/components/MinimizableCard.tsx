import * as React from "react";

interface MinimizeTriggerProps {
    onClick: any;
    minimized: boolean;
}

class MinimizeTrigger extends React.Component<MinimizeTriggerProps> {
    render() {
        var text = '[-]';
        if (this.props.minimized) {
            text = '[+]';
        }

        return <a
            role='button'
            onClick={this.props.onClick}
            style={{float: 'left'}}>
            {text}
        </a>;
        
    }
}

interface CardProps {
    header: any;
    children: any;
}

export class MinimizableCard extends React.Component<CardProps, {
    minimized: boolean
}> {
    // A card that can be minimized
    constructor(props) {
        super(props);

        this.minimize = this.minimize.bind(this);

        this.state = {
            'minimized': false
        };
    }

    minimize() {
        this.setState({
            'minimized': !this.state['minimized']
        });
    }

    render() {
        const minimized = this.state['minimized'];
        var children = <div className="card-body">
            {this.props.children}
        </div>;

        if (minimized) {
            children = null;
        }

        return <div className="card">
            <div className="card-header">
                <MinimizeTrigger onClick={this.minimize} minimized={minimized} />

                {this.props.header}
            </div>

            {children}
        </div>
    }
}