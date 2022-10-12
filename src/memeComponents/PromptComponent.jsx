import { useState, useEffect } from 'react'

//Local Imports
import Prompts from "./prompts.json"

const PromptComponent = (props) => {
    const [currentPromptId, setCurrentPromptId] = useState(0);

    //Get a random card from the list of cards 
    useEffect(() => {
        setCurrentPromptId([props.newPrompt])
    }, [props.newPrompt])

    return (
        <div>
                <h1 className='ExplainingHeader'> Prompt: </h1>
            <div className="PromptContainer">
                <p className='PromptText'> {Prompts.prompts[currentPromptId].quote} </p>
            </div>
        </div>
    )
}

export { PromptComponent }