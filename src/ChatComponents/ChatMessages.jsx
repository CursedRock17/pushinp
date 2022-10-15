import "./chat.css"
import Pusher from "pusher-js"


import "./MessageComponent"
import { MessageComponent } from "./MessageComponent"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"


const ChatMessages = () => {
    const [chatMessage, setChatMessage] = useState({
        username: "",
        message: ""
    });
    const [messages, setMessages] = useState([])

            //Create the string name that represent the server side stuff
            const URLParams = useParams();
            const roomString = URLParams.roomname + '/' + URLParams.roomid
            
            //Main Pusher-js logic that will receive the message and push them into an array
            const pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY, {
                cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER
            });
            const display_channel = pusher.subscribe(roomString);
            display_channel.bind('message', (data) => {
                console.log(data);
                setMessages(...messages, data);
            })

            console.log(chatMessage)

    //Map out the messages from the pusher-js receiver
    const mappedMesssages = messages.map((msg) => 
        <ul className="MessagesList">
            <MessageComponent username={msg.username} message={msg.message}/>
        </ul>
    )

    useEffect(() => {
    }, [])

    return (
        <div>
            <li className="MessagesList">
                {mappedMesssages}
            </li>
        </div>
    )
}

export { ChatMessages }