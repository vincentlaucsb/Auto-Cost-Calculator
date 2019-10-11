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

interface MinimizableCardProps {
    title: string;
    titleCorner?: JSX.Element;
    children: JSX.Element;
}

export class MinimizableCard extends React.Component<MinimizableCardProps, {
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

        var title: any = this.props.title;
        if ('titleCorner' in this.props) {
            title = <React.Fragment>
                {this.props.title}

                <div style={{ float: "right" }}>
                    {this.props.titleCorner}
                </div>
            </React.Fragment>;
        }

        var children = <div className="card-body" style={{
            overflowX: "hidden",
            overflowY: "hidden"
        }}>
            {this.props.children}
        </div>;

        if (minimized) {
            children = null;
        }

        // Stretch to fit flexible box height wise
        // <MinimizeTrigger onClick={this.minimize} minimized={minimized} />
        return <div className="card" style={{ height: "100%" }}>
            <div className="card-header">
                {title}
            </div>
            {children}
        </div>
    }
}