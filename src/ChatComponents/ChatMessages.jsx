import "./chat.css"
import Pusher from "pusher-js"


import "./MessageComponent"
import { MessageComponent } from "./MessageComponent"
import { useParams } from "react-router-dom"
import React, { useEffect, useState } from "react"

/*
class ChatMessages extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            messages: []
        }
    }

    componentDidMount(){
        const pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY, {
            cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER
        });
        const display_channel = pusher.subscribe("Calculus_0");
        display_channel.bind('message', data => {
            const tempArray = this.state.messages.slice(0, 10);
            tempArray.unshift(data);

            this.setState({
                messages:tempArray
            });
        })

        console.log(this.state.messages)
        
    }
    
    mappedMesssages = this.state.messages.map((chat, index) => 
        <ul className="MessagesList" key={index}>
            <MessageComponent username={chat.username} message={chat.msg}/>
        </ul>
    )

    render(){
        return (
            <div>
                <li className="MessagesList">
                    {this.mappedMesssages}
                </li>
            </div>
        )
    }

}


*/
const ChatMessages = () => {
    const [messages, setMessages] = useState([])

    //Create the string name that represent the server side stuff
    const URLParams = useParams();
    const roomString = URLParams.roomname + '_' + URLParams.roomid
    
    const GrabChannelData = () => {
        //Main Pusher-js logic that will receive the message and push them into an array
        const pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY, {
            cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER
        });
        const display_channel = pusher.subscribe(roomString);
        display_channel.bind('message', data => {
            const tempArray = messages.slice(0, 10);
            tempArray.unshift(data);

            setMessages(tempArray);
        })
        
    } 


    //Map out the messages from the pusher-js receiver
    const mappedMesssages = messages.map((chat, index) => 
        <ul className="MessagesList" key={index}>
            <MessageComponent username={chat.username} message={chat.msg}/>
        </ul>
    )

    useEffect(() => {
        GrabChannelData()
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