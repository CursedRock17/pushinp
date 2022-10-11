import "./memes.css"
import Pusher from 'pusher-js'
import { useState, useEffect } from 'react'
import { MemeCard } from "./MemeCard"

const CardsList = () => {
    const [chosenMemes, setChosenMemes] = useState([]);

    const SelectCard = () => {
        //This will remove and add a new card

        const pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY, {
            cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER
        });
        //We will meed to impliment logic to add cards to pusher list by adding them to the channel
        const CardsChannel = pusher.subscribe('displayed');

        CardsChannel.bind('cards', (data) => {
            console.log(data)

        });
    }
    const CurrentCards = chosenMemes.map((meme) => 
            <li>
                <MemeCard mode="Voting" image={meme.image} id={meme.id} description={meme.description}/>
            </li>
    )

    return (
        <div>
            <h1 className="ExplainingHeader"> Choose a Card </h1>
            <div className="CardHolderContainer">
                <ul className="MemesList">
                    {CurrentCards}
                </ul>
            </div>
        </div>
    )
}

export { CardsList }