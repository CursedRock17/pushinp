import "./memes.css"
import { MemeCard } from "./MemeCard"
import Memes from "./memes.json"
import { useState, useEffect } from 'react'

const CardHolder = () => {
    //A list of all ids the user has already seen, this way they get repeats
    const [lastRandomMeme, setLastRandomMeme] = useState({ minRand: 0, maxRand: 5}) //Where to break apart the random memes array
    const [MemesToUse, setMemesToUse] = useState([]);

    //Need to use recursion to make sure we don't have recursion.
    const SetRandomMemes = () => {
        //Get a random meme
        const RandomMemes = [...Memes.memes].sort(() => 0.5 - Math.random());

        return RandomMemes.slice(lastRandomMeme.minRand, lastRandomMeme.maxRand);
    }

    const RemoveMeme = (MemeId) => {
        //Need to find the meme and remove it from memes to use
        setMemesToUse(MemesToUse.filter(CurrentMeme => MemeId !== CurrentMeme.id))
    }

    
    useEffect(() => {
        setMemesToUse(SetRandomMemes);

    }, [])
    //Going to map out the random cards we have in order to display them evenly
    const CurrentCards = MemesToUse.map((meme) => 
            <li>
                <MemeCard removed={() => RemoveMeme(meme.id)} image={meme.image} id={meme.id} description={meme.description}/>
            </li>
    )

    return (
        <div className="CardHolderContainer">
            <ul className="MemesList">
                {CurrentCards}
            </ul>
        </div>
    )
}

export { CardHolder }