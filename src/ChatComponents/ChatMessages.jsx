import "./chat.css"
import Pusher from "pusher-js"

import "./MessageComponent"
import { MessageComponent } from "./MessageComponent"
import React from "react"

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
        const display_channel = pusher.subscribe(this.props.roomName);
        display_channel.bind('message', data => {
            const tempArray = this.state.messages.slice(0, 9);
            tempArray.unshift(data);
            
            this.setState({
                messages:tempArray
            });
        })
    }
    
    
    render(){
        const mappedMesssages = this.state.messages.map((chat, index) => 
        <ul className="MessagesList" key={index}>
            <MessageComponent username={chat.username} message={chat.msg}/>
        </ul>
        )

        return (
            <div>
            <li className="MessagesList">
            {mappedMesssages}
            </li>
            </div>
            )
        }
        
    }

export { ChatMessages }