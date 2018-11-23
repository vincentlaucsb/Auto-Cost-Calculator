import * as React from "react";
import * as ReactModal from "react-modal";
import { Button, PrimaryButton } from "./Buttons";

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
        this.setState({
            'visible': !this.state['visible']
        });
    }

    render() {
        let submit = this.props.submit ? <PrimaryButton
                type="submit"
                form={this.props.submit.formName}>
                {this.props.submit.buttonName}
            </PrimaryButton> : null;

        let triggerButton = this.props.hideTrigger ? null :
            <PrimaryButton onClick={this.toggle}>
                {this.props.triggerText}
            </PrimaryButton>;

        let modalDisplay = {
            display: this.state.visible? 'block' : 'none'
        };

        return (
            <React.Fragment>
                <div className="modal" style={modalDisplay}
                        tabIndex={-1} role="dialog">
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
                 </div>
                {triggerButton}
            </React.Fragment>);
    }   
}