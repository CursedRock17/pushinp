import { Footer } from "../MainComponents/Footer"
import { Navbar } from "../MainComponents/Navbar"
import { UsernameForm } from "../queuecomponents/FiltersForm"
import { JoinButton } from "../queuecomponents/JoinButton"

import { useState } from 'react'


//Home Page
const Home = () => {
  const [username, setUsername] = useState("default-1284812");

    return (
        <div className="EvenHome">
            <Navbar />
            <UsernameForm setUsername={setUsername} />
            <JoinButton username={username} />
            <Footer />
        </div>
    )
}

export { Home }