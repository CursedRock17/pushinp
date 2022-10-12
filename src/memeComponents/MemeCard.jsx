import "./memes.css"
import { useState, useEffect } from 'react'
import axios from 'axios'

const MemeCard = (props) => {
    const SelectCard = async () => {
        if("Choosing"){
            //This will remove and add a new card
            props.Refresh(props.id)
    
            //Create the object that needs to get sent to the endpoint
            //Don't need to worry about the pusher object yet
            const CardObject = {
                username: props.username,
                image: props.image,
                score: props.score
            }
            
            props.setPlayerScore(props.score)

            const postlink = `http://localhost:3001/cards/0`
            props.SwitchMode("voted");

            await axios.post(postlink, CardObject);
        }
    }

    return (
        <button
        onClick={() => SelectCard(props.mode)}
        className="MemeCardContainer"
        disabled={props.disabled}
        >
            <img className="MemeImage" src={props.image} alt={props.description}></img>
        </button>
        )
}

export { MemeCard }