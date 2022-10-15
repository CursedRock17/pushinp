import Pusher from 'pusher-js'
import './QueueComponents.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const JoinButton = (props) => {
    const navigate = useNavigate();
    const [roomId, setRoomId] = useState(0);
    const subscriptionAddress = props.category + '/' + roomId;

    const UpdateCount = async () => {
        //Need this pusher object to monitor who joins
        const pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY, {
            cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER
        });
        

        const display_channel = pusher.subscribe(subscriptionAddress);
        //Check if that lobby is full, if it is, then make a new one
        display_channel.bind('pusher:subscription_count', (data) => {
            //To calculate the game, take the count and divide by lobby size
            const next_game = Math.floor((data.subscription_count - 1) / 4);
            setRoomId(next_game);
        })
    }

    const JoinRoom = (username) => {
        UpdateCount();
        navigate("/Room/" + subscriptionAddress + "/?username=" + username)
    }

    return (
        <div className="WholePage">
            <button
            className='JoinButton'
            onClick={() => JoinRoom(props.username)}
            >
                Join {props.category} Room {props.roomId}
            </button>
        </div>
    )
}

export { JoinButton }

