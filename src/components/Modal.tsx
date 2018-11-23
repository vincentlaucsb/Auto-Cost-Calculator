import * as React from "react";
import * as ReactModal from "react-modal";
import { Button } from "./Buttons";

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

        if ('visible' in this.props) {
            this.state = { 'visible': this.props.visible };
        } else {
            this.state = { 'visible': false };
        }

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        console.log('toggling');
        console.log(this.state);
        this.setState({
            'visible': !this.state['visible']
        });
    }

    render() {
        var submit;
        if (this.props.submit) {
            submit = <button
                type="submit"
                className="btn btn-primary"
                form={this.props.submit.formName}>
                {this.props.submit.buttonName}
            </button>
        }

        var triggerButton;
        if (!this.props.hideTrigger) {
            triggerButton = <button className="btn btn-primary" onClick={this.toggle}>
                {this.props.triggerText}
            </button>;
        }

        let modalDisplay = {
            display: 'none'
        };

        if (this.state.visible) {
            modalDisplay = {
                display: 'block'
            };
        }

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
                        <button type="button" onClick={this.toggle}
                            className="btn btn-secondary" data-dismiss="modal">
                            Close
                        </button>
                    </div>
                    </div>
                    </div>
                    </div>
                {triggerButton}
            </React.Fragment>);
    }   
}