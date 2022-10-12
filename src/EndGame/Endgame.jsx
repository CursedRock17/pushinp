import "./Endgame.css"

import Pusher  from 'pusher-js'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

const Endgame = (props) => {
    const [scores, setScores] = useState([]);
    const [currentScore, setCurrentScore] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentUser, setCurrentUser] = useState("")

    const DisplayUsers = () => {        
        setCurrentUser(searchParams.get('username'))
    }

    const MappedScores = scores.map((score) => 
        <ul classname="ScoreMap">
            <h1 className="ScoreHeader"> {score.username} </h1>
            <p className="ScoreText"> {score.score} </p>
        </ul>
    )

    useEffect(() => {
        DisplayUsers();
    },[])

    return (
        <div>
                <div className="EndgameContainer">
                    <h1 className="ExplainingHeader"> Thanks for playing {currentUser}  </h1>
                    <h1 className="ExplainingHeader"> Click the Home link to search for a new game</h1>
                </div>
        </div>
    )
}

export { Endgame }