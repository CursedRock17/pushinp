import "./memes.css"
import { MemeCard } from "./MemeCard"
import Memes from "./memes.json"
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

const CardHolder = (props) => {
    //A list of all ids the user has already seen, this way they get repeats
    const [lastRandomMeme, setLastRandomMeme] = useState({ minRand: 0, maxRand: 5}) //Where to break apart the random memes array
    const [MemesToUse, setMemesToUse] = useState([{}]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [username, setUsername] = useState("");
    const RandomMemes = [...Memes.memes].sort(() => 0.5 - Math.random());

    //Need to use recursion to make sure we don't have recursion.
    const SetRandomMemes = () => {
        //Get a random meme
        setLastRandomMeme({ 
            minRand: lastRandomMeme.maxRand,
            maxRand: lastRandomMeme.maxRand + 1
        })

        return RandomMemes.slice(lastRandomMeme.minRand, lastRandomMeme.maxRand);
    }

    const RefreshMeme = (MemeId) => {
        //Need to find the meme and remove it from memes to use
        const TempMemes = MemesToUse.filter(CurrentMeme => MemeId !== CurrentMeme.id);
        TempMemes.push(SetRandomMemes()[0]);
        
        setLastRandomMeme({ 
            minRand: lastRandomMeme.maxRand,
            maxRand: lastRandomMeme.maxRand + 1
        })
        
        //Now set this array to the filtered one
        setMemesToUse(TempMemes);
        //No need to let them click
    }


    
    useEffect(() => {
        setMemesToUse(SetRandomMemes);

        //On load get the current username out of the search params
        setUsername(searchParams.get('username'))
    }, [])
    //Going to map out the random cards we have in order to display them evenly

    const CurrentCards = MemesToUse.map((meme) => 
            <li>
                <MemeCard setPlayerScore={(score) => props.setPlayerScore(playerScore => playerScore + score)} score={meme.score} SwitchMode={(mode) => props.SwitchMode(mode)} disabled={props.voted} mode="Choosing" username={username} Refresh={() => RefreshMeme(meme.id)} image={meme.image} id={meme.id} description={meme.description}/>
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

export { CardHolder }