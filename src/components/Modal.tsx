/** React-Bootstrap Modal System
 * 
 *  Creates a single modal container which handles all requests to display modals.
 *  This allows modals to be displayed without interference from other elements.
 *  
 */

import * as React from "react";
import { Button, PrimaryButton } from "./Buttons";

let container = null; // Keep track of ModalContainer

export class ModalContainer extends React.Component<{}, {currentModal: JSX.Element}> {
    constructor(props) {
        super(props);

        this.state = {
            'currentModal': null
        }
    }

    componentDidMount() {
        // Keep track of <ModalContainer />
        container = this;
    }

    clearModal() {
        this.setState({ 'currentModal': null });
    }

    render() {
        const currentModal = this.state['currentModal'];

        return <div className="modal" tabIndex={-1} role="dialog"
            style={{
                display: currentModal ? 'block' : 'none',
                background: 'rgba(0, 0, 0, 0.5)'
            }}>
            {this.state.currentModal}
        </div>
    }
}

interface ModalProps {
    submit?: {
        buttonName: string;
        formName: string;
    };
    children?: any;
    title: string;
    triggerText?: string;
    visible?: boolean;
    hideTrigger?: boolean;
}

interface ModalState {
    visible: boolean;
}

export class Modal extends React.Component<ModalProps, ModalState> {
    constructor(props: ModalProps) {
        super(props);

        this.state = {
            'visible': ('visible' in this.props) ? this.props.visible : false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        if (!this.state.visible) {
            // If not visisble, then change that
            this.renderModal();
        } else {
            container.clearModal();
        }

        this.setState({
            'visible': !this.state['visible']
        });
    }

    renderModal() {
        let submit = this.props.submit ? <PrimaryButton
                type="submit"
                form={this.props.submit.formName}>
                {this.props.submit.buttonName}
            </PrimaryButton> : null;

        container.setState({
            currentModal:
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{this.props.title}</h5>

                            <button type="button" className="close"
                                onClick={this.toggle}
                                data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {this.props.children}
                        </div>
                        <div className="modal-footer">
                            {submit}
                            <Button className="btn-secondary" onClick={this.toggle}
                                data-dismiss="modal">Close</Button>
                        </div>
                    </div>
                </div>
        });
    }

    render() {
        return <PrimaryButton onClick={this.toggle}>
            {this.props.triggerText}
        </PrimaryButton>;
    }
}