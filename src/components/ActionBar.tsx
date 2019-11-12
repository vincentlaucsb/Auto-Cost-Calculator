import * as React from "react";

import { FileLoader } from "./FileLoader";
import { DeleteConfirm } from "./DeleteConfirm";
import { Modal } from "./Modal";

interface ActionBarProps {
    loadData: (data: object) => void;
    undoChanges: () => void;
    reset: () => void;
    save: () => void;
    saveFile: () => void;
}

// Contains the controls for loading and saving
export default class ActionBar extends React.Component<ActionBarProps> {
    constructor(props: ActionBarProps) {
        super(props);
    }

    render() {
        return <div className="action-bar btn-toolbar"
            role="toolbar">
            <div className="btn-group mr-2" role="group">
                <button className="btn btn-primary"
                    onClick={this.props.undoChanges}>
                    <img src="./img/undo-24px.svg" alt="Save" />
                    Undo Changes
            </button>
                <Modal submit={{
                    buttonName: "Load",
                    formName: "loadFile"
                }}

                    buttonProps={{
                        className: "btn-primary"
                    }}

                    triggerText="Load" title="Load">
                    <FileLoader loadFile={this.props.loadData} />
                </Modal>
                <button
                    className="btn btn-primary"
                    onClick={this.props.save}>
                    <img src="./img/save-24px.svg" alt="Save" /> Save</button>
                <button className="btn btn-primary"
                    onClick={this.props.saveFile}
                >
                    <img src="./img/file_copy-24px.svg" alt="Save" />
                    Save to File</button>
            </div>
            <div className="btn-group" role="group">
                <button className="btn btn-primary"
                    onClick={this.props.reset}
                >
                    <img src="./img/refresh-24px.svg" alt="Save" />
                    Restore Defaults</button>
            </div>
        </div>
    }
}