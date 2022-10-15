import "./chat.css"
import React from "react"
import axios from "axios"

class ImageComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedFile: undefined
        }
        this.ChangeFile = this.ChangeFile.bind(this);
    }

    ChangeFile = (event) => {
        event.preventDefault();
        console.log(event.target.files)
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    FileUpload = () => {
        const formData = new FormData();
        console.log(formData)
        formData.append(
        "myFile",
        this.state.selectedFile,
        this.state.selectedFile.name
            );
        // console log uploaded file details
        console.log(this.state.selectedFile);
        // user send req to the server
        axios.post("https://localhost:3001/uploadfile", formData);
    }

    render(){
        return (
            <div>
                <input
                type="file"
                id="imageUploader"
                onClick={this.ChangeFile}
                />
                Upload some work
                {
                    this.state.selectedFile === undefined ?
                    <></> :
                    <button
                    className="UploadButton"
                    onClick={this.FileUpload}
                    >
                        Add Picture
                    </button>

                }
                <img alt="Missing" src={this.state.selectedFile} />
            </div>
        )
    }
}

export { ImageComponent }