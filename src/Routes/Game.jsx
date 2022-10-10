import React, { useState , useEffect} from 'react'
import Pusher from 'pusher-js'
import "./Routes.css"
import { Navbar } from '../MainComponents/Navbar';
import { Footer } from '../MainComponents/Footer';
import { CardHolder } from '../memeComponents/CardHolder';
import { PromptComponent } from '../memeComponents/PromptComponent';
import { CardsList } from '../memeComponents/CardsList';
import { TimeCheck } from "../memeComponents/TimeCheck" 

function GamePage () {
    const [currentPlayers, setCurrentPlayers] = useState(0);
    const [playerScore, setPlayerScore] = useState(0);

    const RetrieveCount = () => {
        const pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY, {
            cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER
        });
        
        const display_channel = pusher.subscribe('displayed');
        //Check if that lobby is full, if it is, then make a new one
        display_channel.bind('pusher:subscription_count', (data) => {
            //To calculate the game, take the count and divide by lobby size
            const LobbySize = data.subscription_count % 8;
            if(currentPlayers !== LobbySize){
                setCurrentPlayers(LobbySize);
            }
        })
    }

    useEffect(() => {
        //RetrieveCount();
    }, [])

        return (
        <div>
                <Navbar />
        {
            currentPlayers !== 0 ? 
            <>
                <div>
                    <h2 className='HeaderTwo'>
                        Loading...
                    </h2>
                    <h2 className='HeaderTwo'>
                        {currentPlayers} / 8
                    </h2>
                </div>
            </> :  
            <>
                <div>
                    <div className='InfoTotal'>
                        <h2 className='HeaderTwo'> Game Started </h2>
                        <div className='GameInfo'>
                            <h2 className='HeaderTwo'> Your Score: {playerScore} </h2>
                            <TimeCheck />
                        </div>
                    </div>
                    <div className='GameBoard'>
                        <div className='TopSubsectionBoard'>
                            <PromptComponent />
                            <CardsList />
                        </div>
                        <CardHolder />
                    </div>
                </div>
            </>
        }
            <div>

            </div>
            <Footer />
        </div>
        )
}

export { GamePage }