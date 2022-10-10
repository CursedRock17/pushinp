import "./maincomps.css"
import { Link} from 'react-router-dom'
import { Home } from "../Routes/Home"

const Navbar = () => {
        return (
            <Link  to="/" element={<Home />}>
                <h1 className='App-header'>Pushin P </h1>
            </Link>
        )
}

export { Navbar }