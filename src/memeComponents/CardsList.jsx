import "./memes.css"
import Pusher from 'pusher-js'
import { useState, useEffect } from 'react'
import { MemeCard } from "./MemeCard"

const CardsList = () => {
    const [memes, setMemes] = useState([]);

    //Create Pusher Object
    const pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY, {
        cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER
    });

    const SelectCard = () => {
        //This will remove and add a new card
        //We will meed to impliment logic to add cards to pusher list by adding them to the channel
        const CardsChannel = pusher.subscribe('displayed');
        CardsChannel.bind('cards', (data) => {
            //Should be able to taken all the chosen memes and add them to the array
            if(memes.length > 4){
                setMemes([])
            }
            else {
                setMemes([...memes, data])
            }
        });
    }

    useEffect(() => {
        SelectCard();
    })

    const CurrentCards = memes.map((meme) => 
            <li>
                <MemeCard disabled={true} mode="Voting" image={meme.image} id={meme.id} description={meme.description}/>
            </li>
    )

    return (
        <div>
            <div className="CardHolderContainer">
                <ul className="MemesList">
                    {CurrentCards}
                </ul>
            </div>
        </div>
    )
}

export { CardsList }