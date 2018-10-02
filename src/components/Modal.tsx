import * as React from "react";

interface ModalProps {
    children?: any;
    title: string;
    triggerText: string;
    visible: boolean;
}

interface ModalState {
    visible: boolean;
}

export class Modal extends React.Component<ModalProps, ModalState> {
    constructor(props: ModalProps) {
        super(props);

        this.state = {
            visible: this.props.visible
        };

        this.closeModal = this.closeModal.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidUpdate(prevProps) {
        // Update state to reflect visibility prop
        if (prevProps.visible != this.props.visible) {
            this.setState({
                visible: this.props.visible
            });
        }
    }

    handleClick(event) {
        if (this.state.visible)
            this.setState({
                visible: false
            });
        else
            this.setState({
                visible: true
            });
    }

    closeModal(event) {
        // Handle close button events
        this.setState({
            visible: false
        });
    }

    render() {
        let modalStyle = {};
        if (this.state.visible) {
            modalStyle = {
                display: 'block'
            };
        }

        return <div>
        <div className="modal" style={modalStyle} id="myModal" tabIndex={-1} role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{this.props.title}</h5>
                        <button type="button" className="close" onClick={this.closeModal} data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {this.props.children}
                    </div>
                    <div className="modal-footer">
                        <button type="button" onClick={this.closeModal} className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
            </div>
            <button
                className="btn btn-primary"
                onClick={this.handleClick}>
                {this.props.triggerText}
            </button>
        </div>;
    }   
}