import "./chat.css"
import { useState } from "react"
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";

const ChatBox = () => {
    const [message, setMessage] = useState("");
    const [searchParams] = useSearchParams();
    const URLParams = useParams();

    const SubmitMessage = () => {
        //Set up the axios link to send the data to 
        const roomString = URLParams.roomname + '/' + URLParams.roomid
        const postString = "http://www.localhost:3001/" + roomString
        
        //Message Data is all the Data that will get put into the message component
        const messageData = {
            msg: message,
            roomStr: roomString,
            username: searchParams.get('username')
        };
        
        console.log(messageData)
        axios.post(postString, messageData);
    }

    return (
        <div className="BoxContainer">
            <div>
                <textarea
                className="MessageSpace"
                placeholder="Type a Message"
                maxLength={200}
                onChange={(e) => setMessage(e.target.value)}
                >
                </textarea>
                <button
                className="SubmitButton"
                onClick={SubmitMessage}
                >
                    Send Message
                </button>
            </div>
        </div>
    )
}

export { ChatBox }