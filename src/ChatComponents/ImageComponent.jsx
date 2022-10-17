import "./chat.css"
import React from "react";
import axios from "axios"
import Pusher from "pusher-js";



class ImageComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedFile: undefined
        }
        this.ChangeFile = this.ChangeFile.bind(this);
    }


    ChangeFile = async (event) => {
        event.preventDefault();
        
        const roomString = this.props.params.roomname + '_' + this.props.params.roomid
        const postString = "http://localhost:3001/uploadfile"
        
        const chosenImage = event.target.files[0]
        chosenImage.roomStr = roomString

        const formData = new FormData();

        formData.append(
          'image',
          chosenImage,
          roomString,
        );


        axios.post(postString, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
              },
        })
    }

    componentDidMount(){
        const roomString = this.props.params.roomname + '_' + this.props.params.roomid;

        const pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY, {
            cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER
        });
        const display_channel = pusher.subscribe(roomString);
        display_channel.bind('images', (data) => {
            //Data will be in the form of the url of the image to look for
            console.log(data.newDoc);
            this.setState({
                selectedFile: data.newDoc.secure_url
            })
        })
        
    }

    render(){
        return (
        <div>        
            <div className="ImageComponent">
                <h1 className="NameHeader">
                    Upload Some Work
                </h1>
                <input
                    type="file"
                    id={this.props.params.roomname + '_' + this.props.params.roomid}
                    accept=".jpeg, .png, .jpg"
                    className="imageUploader"
                    onChange={(e) => this.ChangeFile(e)}
                />
            </div>
            {
                this.state.selectedFile !== undefined ?
                <img alt="NoImage" height={200} width={200} src={this.state.selectedFile} /> :
                <></>
            }
        </div>
        )
    }
}

export { ImageComponent }



