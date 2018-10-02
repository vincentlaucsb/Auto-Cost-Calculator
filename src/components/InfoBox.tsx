import * as React from "react";
import { Modal } from "./Modal";

interface InfoBoxProps {
    children?: any;
    title: string;
}

interface InfoBoxState {
    modalVisible: boolean;
}

export class InfoBox extends React.Component<InfoBoxProps, InfoBoxState> {
    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false,
        };
    }

    render() {
        return <div style={{ display: 'inline', float: 'right' }}>
            <Modal
                title={this.props.title}
                triggerText="?"
                visible={this.state.modalVisible}>
                {this.props.children}
            </Modal>
        </div>;
    }
}