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
        const roomString = URLParams.roomname + '_' + URLParams.roomid
        const postString = "http://www.localhost:3001/" + (URLParams.roomname + '/' + URLParams.roomid)
        //Message Data is all the Data that will get put into the message component
        const messageData = {
            msg: message,
            roomStr: roomString,
            username: searchParams.get('username')
        };
        

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