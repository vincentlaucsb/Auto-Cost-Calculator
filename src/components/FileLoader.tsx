import * as React from "react";

interface FileLoaderProps {
    loadFile: (data: object) => void;
}

interface FileLoaderState {
    filename: string;
}

// Form used for reading Auto Cost Calculator saved files
export class FileLoader extends React.Component<FileLoaderProps, FileLoaderState> {
    fileInput: any;

    constructor(props: FileLoaderProps) {
        super(props);

        this.state = {
            filename: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.readFile = this.readFile.bind(this);

        // See: https://reactjs.org/docs/uncontrolled-components.html#the-file-input-tag
        this.fileInput = React.createRef();
    }

    readFile(file: any) {
        /*
         * Ref:
         * https://stackoverflow.com/questions/750032/reading-file-contents-on-the-client-side-in-javascript-in-various-browsers
         */

        const reader = new FileReader();
        reader.onload =(fileLoadedEvent: Event) => {
            var text = reader.result;
            console.log(text);
            console.log("PARSED JSON", JSON.parse(text.toString()));
            this.props.loadFile(JSON.parse(text.toString()));
        };

        console.log("READING AS TEXT FILE");
        reader.readAsText(file, "UTF-8");
    }

    handleSubmit(event) {
        console.log("Submit pressed");
        event.preventDefault(); // Prevent page refresh

        let userFile = this.fileInput.current.files[0];
        console.log("Uploaded ", userFile.name);

        this.readFile(userFile);
    }

    render() {
        return <form onSubmit={this.handleSubmit} id="loadFile">
            <div className="form-group">
                <label>File
                    <input className="form-control" type="file" ref={this.fileInput} />
                    </label>
                </div>
            </form>
    }
}