import "./memes.css"
import { Pusher } from 'pusher-js'
import { useState, useEffect } from 'react'

const MemeCard = (props) => {
    //We will meed to impliment logic to add cards to pusher list

    return (
            <div className="MemeCardContainer">
                <button>
                    <img className="MemeImage" src={props.image} alt={props.description}></img>
                </button>
            </div>
        )
}

export { MemeCard }