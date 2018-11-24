import * as React from "react";
import { DangerButton } from "./Buttons";

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
        this.setState({ confirm: true });
    }

    render() {
        const text = ('text' in this.props) ? this.props.text : 'x';

        return this.state.confirm ?
            <DangerButton className={this.props.className}
                onClick={this.delete}>Confirm</DangerButton> :
            <DangerButton className={this.props.className}
                onClick={this.toggle}>{text}</DangerButton>;
    }
}