import * as React from "react";
import { DangerButton, PrimaryButton } from "./Buttons";

interface DeleteConfirmProps {
    text?: string;
    className?: string;
    delete: (param?: any) => void;
}

export class DeleteConfirm extends React.Component<DeleteConfirmProps, { confirm: boolean }> {
    /*
     * Delete button which changes to a confirm prompt before
     * finally doing the deed
     */
    constructor(props) {
        super(props);

        this.state = {
            confirm: false
        };

        this.delete = this.delete.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    delete() {
        this.props.delete();
        this.setState({ confirm: false });
    }

    toggle() {
        this.setState({ confirm: !this.state.confirm });
    }

    render() {
        const text = ('text' in this.props) ? this.props.text : 'x';
        let deleteButton = <img src="./img/delete-24px.svg" onClick={this.toggle} alt="Delete" />;

        if ('text' in this.props) {
            deleteButton = <DangerButton className={this.props.className} onClick={this.toggle}>{text}</DangerButton>;
        }

        return this.state.confirm ?
            <React.Fragment>
                <DangerButton className={this.props.className}
                    onClick={this.delete}>Confirm</DangerButton>
                <PrimaryButton className={this.props.className} onClick={this.toggle}>Cancel</PrimaryButton>
            </React.Fragment> :
            deleteButton;
    }
}