import * as React from "react";
import * as ReactModal from "react-modal";

interface ModalProps {
    showModal: boolean;
    children: any;
    tabIndex: number;
}

class Modal extends React.Component<ModalProps, any> {
    constructor(props) {
        super(props);
    }

    render() {
        /** <button onClick={this.handleCloseModal}>Close Modal</button> **/

        return (
            <div tabIndex={this.props.tabIndex}>
                <ReactModal
                    isOpen={this.props.showModal}
                    contentLabel="Minimal Modal Example"
                >
                    {this.props.children}
                </ReactModal>
            </div>
        );
    }
}


interface MultiModalState {
    modalLayers: Array<any>;
    visibility: Array<boolean>;
}

export class MultiModal extends React.Component<{}, MultiModalState> {
    constructor(props) {
        super(props);

        this.state = {
            "modalLayers": [],
            "visibility": []
        };

        this.create = this.create.bind(this);
    }

    create(children: any) {
        let temp = this.state['modalLayers'];
        temp.push(children);

        let temp_vis = this.state['visibility'];
        temp_vis.push(false);

        this.setState({
            'modalLayers': temp,
            'visibility': temp_vis
        });
    }

    toggleVisibility(i: number) {
        let temp = this.state['visibility'];
        temp[i] = !temp[i];

        console.log("Changing visibility", temp, this.state['visibility']);
        console.log(this.state);

        this.setState({
            'visibility': temp
        });
    }

    getTrigger(i: number) {
        return <button
            onClick={this.toggleVisibility.bind(this, i)}>Trigger Modal {i}
        </button>
    }

    render() {
        return <div>
            {this.state['modalLayers'].map((i) =>
                <Modal
                    showModal={this.state['visibility'][this.state['modalLayers'].indexOf(i)]}
                    tabIndex={this.state['modalLayers'].indexOf({ i }) } > { i }</Modal>
            )}
        </div>
    }
}