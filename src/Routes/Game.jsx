import React, { useState , useEffect} from 'react'
import Pusher from 'pusher-js'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'

import "./Routes.css"
import Prompts from '../memeComponents/prompts.json'

import { Navbar } from '../MainComponents/Navbar';
import { Footer } from '../MainComponents/Footer';
import { CardHolder } from '../memeComponents/CardHolder';
import { PromptComponent } from '../memeComponents/PromptComponent';
import { CardsList } from '../memeComponents/CardsList';
import { TimeCheck } from "../memeComponents/TimeCheck" 
import { Endgame } from '../EndGame/Endgame';

function GamePage () {
    const [currentPlayers, setCurrentPlayers] = useState(0);
    const [playerScore, setPlayerScore] = useState(0);
    const [currentRound, setCurrentRound] = useState(1);
    const [newPrompt, setNewPrompt] = useState(0);
    const [voting, setVoting] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams();

    const MaxRounds = 10;
    
    const SwitchMode = (mode) => {
        if(mode === "reset"){
            setVoting(false);

            //This ups the round count every single time 15 seconds goes by. then sends in the score
            setCurrentRound(currentRound => currentRound + 1)
            if(currentRound === MaxRounds){
                const scoreObject = {
                    score: playerScore,
                    username: searchParams.get('username')
                }
                axios.post("http://localhost:3001/scores/0", scoreObject)
            }
            
            
            //Get a new prompt
            setNewPrompt(Math.floor(Math.random() * Prompts.prompts.length));
        }
        else {
            setVoting(true);
        }
    }

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
        RetrieveCount();
    }, [])

        return (
        <div>
                <Navbar />
        {
            currentPlayers !== 0 ? 
            <>
                <div className='FillerSpace'>
                    <h2 className='HeaderTwo'>
                        Loading...
                    </h2>
                    <h2 className='HeaderTwo'>
                        {currentPlayers} / 8
                    </h2>
                </div>
            </> :  
            currentRound > MaxRounds ?
            <Endgame /> 
            :
            <>
                <div>
                    <div className='InfoTotal'>
                        <h2 className='HeaderTwo'> Game Started </h2>
                        <div className='GameInfo'>
                            <h2 className='HeaderTwo'> Your Score: {playerScore} </h2>
                            <h2 className='HeaderTwo'> Current Round: {currentRound} </h2>
                            <TimeCheck SwitchMode={(mode) => SwitchMode(mode)} voting={voting} />
                        </div>
                    </div>
                    <div className='GameBoard'>
                        <div className='TopSubsectionBoard'>
                            <PromptComponent newPrompt={newPrompt}/>
                        </div>
                            <CardsList />
                            <CardHolder setPlayerScore={(score) => setPlayerScore(score)} voted={voting} SwitchMode={(mode) => SwitchMode(mode)} round={currentRound}/>
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