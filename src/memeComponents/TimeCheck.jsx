import { useState, useEffect } from 'react'

const TimeCheck = (props) => {
    const [secondsRemaining, setSecondRemaining] = useState(30);

    useEffect(() => {
        //Timer logic will be implemented here, with setInterval, ticking down every 1000 ms
        const timer = setInterval(() => {
            if(secondsRemaining > 0)
            setSecondRemaining(secondsRemaining - 1);
            else {
                props.SwitchMode();
            }
        }, 1000);
        
        if(props.NewRound){
            clearInterval(timer)
        }
        //After the timer has gone to zero we can begin to check the cards, then reset the timer
        //Clear interval doesn't do this, it will be down elsewhere

        return () => clearInterval(timer);

    }, [secondsRemaining])

    return (
        <div>
            <h2 className='HeaderTwo'> Time Remaining: {secondsRemaining}  </h2>
        </div>
    )
}
export { TimeCheck }