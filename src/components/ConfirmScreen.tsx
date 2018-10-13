import { Modal } from "./Modal";
import * as React from "react";

interface ConfirmScreenProps {
    yesAction: any;
}

class ConfirmScreen extends React.Component<ConfirmScreenProps> {
    render() {
        return <Modal
            title="Confirm"
            visible={false}
        >
            <p>Are you sure</p>
            <button onClick={this.props.yesAction}>Yes</button>
            </Modal>
    }
}