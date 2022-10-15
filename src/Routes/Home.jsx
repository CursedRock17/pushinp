import { Footer } from "../MainComponents/Footer"
import { Navbar } from "../MainComponents/Navbar"

import { useState } from 'react'
import { LoginForm } from "../LoginComponents/LoginForm";
import { JoinButton } from "../LoginComponents/JoinButton";


//Home Page
const Home = () => {
    const [username, setUsername] = useState("default-1284812");
    const [category, setCategory] = useState("Calculus");

    return (
        <div className="EvenHome">
            <Navbar />
            <LoginForm setUsername={setUsername} setCategory={setCategory}/>
            <JoinButton username={username} category={category} />
            <Footer />
        </div>
    )
}

export { Home }