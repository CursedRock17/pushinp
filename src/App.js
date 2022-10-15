import './App.css';
import { Home } from './Routes/Home';
import { NoPage} from "./Routes/NoPage"
import { GamePage} from './Routes/Game'

import { BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <div className='App'>
      <script src="https://js.pusher.com/7.2.0/pusher.min.js"></script>
        <Routes>
          <Route path="/" element={ <Home />}  />
          <Route path="*" element={ < NoPage />}  />
          <Route path="Room/:roomname/:roomid" element={ < GamePage />}  />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
