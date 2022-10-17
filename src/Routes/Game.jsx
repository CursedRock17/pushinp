/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState , useEffect} from 'react'
import Pusher from 'pusher-js'
import { useParams } from 'react-router-dom'

import "./Routes.css"

import { Navbar } from '../MainComponents/Navbar';
import { Footer } from '../MainComponents/Footer';
import { ChatBox } from '../ChatComponents/ChatBox'
import { ChatMessages } from '../ChatComponents/ChatMessages'
import { ImageComponent } from '../ChatComponents/ImageComponent'

function GamePage (props) {
    const [currentPeople, setcurrentPeople] = useState(0);
    
    const URLParams = useParams();
    const subString = URLParams.roomname + '_' + URLParams.roomid;


    const RetrieveCount = () => {
        const pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY, {
            cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER
        });
        

        const display_channel = pusher.subscribe(subString);
        //Check if that lobby is full, if it is, then make a new one
        display_channel.bind('pusher:subscription_count', (data) => {
            //To calculate the game, take the count and divide by lobby size
            const LobbySize = data.subscription_count % 4;
            if(currentPeople !== LobbySize){
                setcurrentPeople(LobbySize);
            }
        })
    }


    useEffect(() => {
        RetrieveCount();
    }, [])

        return (
        <div>
        <Navbar />
            <>
                <h2 className='HeaderTwo'>
                    People in Room:   {currentPeople}
                </h2>
            </>
            <>
                <div>
                    <div className='InfoTotal'>
                        <h2 className='HeaderTwo'> {URLParams.roomname}  </h2>
                        <div className='GameInfo'>
                        </div>
                    </div>
                    <div className='GameBoard'>
                            <ImageComponent params={useParams()} />
                            <ChatMessages roomName={subString} />
                        <div className='TopSubsectionBoard'>
                            <ChatBox />
                        </div>
                    </div>
                </div>
            </>
            <div>
            </div>
            <Footer />
        </div>
        )
}

export { GamePage }