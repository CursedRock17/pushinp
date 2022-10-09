import {  useParams, Link} from 'react-router-dom'
import { Home } from './Home'
import React from 'react'
import Pusher from 'pusher-js'
import "./Routes.css"

class GamePage extends React.Component {
    constructor(){
        super();
        this.state = {
            currentPlayers: 0
        }
    }

    GetCount = () => {
        const urlData = useParams();
    
        const pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY, {
            cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER
        });
        
        const display_channel = pusher.subscribe('displayed');
        //Check if that lobby is full, if it is, then make a new one
        display_channel.bind('pusher:subscription_count', (data) => {
            //To calculate the game, take the count and divide by lobby size
            const LobbySize = data.subscription_count % Number(urlData.gameid);
            console.log(data.subscription_count)
            this.setState({
                currentPlayers: LobbySize 
            })
        })
    }

    render(){
        return (
            <div>
            <Link  to="/" element={<Home />}>
                <h1 className='HomeLink'>Go Home </h1>
            </Link>
        {
            this.state.currentPlayers !== 8 ? 
            <>
                <div>
                    <h2 className='HeaderTwo'>
                        Loading...
                    </h2>
                    <h2 className='HeaderTwo'>
                        {this.state.currentPlayers} / 8
                    </h2>
                </div>
            </> : 
            <>
                <div>

                </div>
            </>
        }
        <div>

        </div>
    </div>
        )
    }
}

export { GamePage }