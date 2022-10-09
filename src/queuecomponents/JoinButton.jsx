import Pusher from 'pusher-js'
import './QueueComponents.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const JoinButton = (props) => {
    const navigate = useNavigate();
    const [gameId, setGameId] = useState(0);

    const UpdateCount = () => {
        //Need to update count only in useEffect or else theres too much loading
        console.log("Bob")
        const pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY, {
            cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER
        });
        
        const display_channel = pusher.subscribe('displayed');
        //Check if that lobby is full, if it is, then make a new one
        display_channel.bind('pusher:subscription_count', (data) => {
            //To calculate the game, take the count and divide by lobby size
            const next_game = Math.floor((data.subscription_count - 1) / 8);
            setGameId(next_game);
        })

        display_channel.bind('message', data => {
            console.log(data.data);
        });
    }

    const JoinQueue = (user) => {
        navigate("/Game/" + gameId)
    }

    useEffect(() => {
        UpdateCount();
    }, [])

    return (
        <div className="WholePage">
            <button
            className='JoinButton'
            onClick={(user) => JoinQueue(user.target.value)}
            >
                Join Queue {props.username}
            </button>
        </div>
    )
}

export { JoinButton }

