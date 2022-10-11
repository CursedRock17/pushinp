import "./memes.css"
import { useState, useEffect } from 'react'
import axios from 'axios'

const MemeCard = (props) => {
    const SelectCard = async (mode) => {
        if("Choosing"){
            console.log("Choosen")
            //This will remove and add a new card
            props.Refresh(props.id)
    
            //Create the object that needs to get sent to the endpoint
            //Don't need to worry about the pusher object yet
            const CardObject = {
                username: props.username,
                image: props.image,
            }
            
            await axios.post("http://localhost:3001/cards", CardObject);
        }
        else if("Voting") {
            console.log("Voted")
        }
    }

    return (
        <button
        onClick={() => SelectCard(props.mode)}
        className="MemeCardContainer"
        >
            <img className="MemeImage" src={props.image} alt={props.description}></img>
        </button>
        )
}

export { MemeCard }