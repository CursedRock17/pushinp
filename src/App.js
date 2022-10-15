import './App.css';
import { Home } from './Routes/Home';
import { NoPage} from "./Routes/NoPage"
import { GamePage} from './Routes/Game'

import { BrowserRouter, Routes, Route} from 'react-router-dom'

import axios from 'axios';
import { useState, useRef } from 'react'

function App (){
  const [file, setFile] = useState(''); // storing the uploaded file
    // storing the recived file from backend
    const [data, getFile] = useState({ name: "", path: "" });
    const [progress, setProgess] = useState(0); // progess bar
    const el = useRef(); // accesing input element

    const handleChange = (e) => {
        setProgess(0)
        const file = e.target.files[0]; // accessing file
        console.log(file);
        setFile(file); // storing file
    }

    const uploadFile = () => {
        const formData = new FormData();
        formData.append('file', file); // appending file
        axios.post('http://localhost:4500/upload', formData, {
            onUploadProgress: (ProgressEvent) => {
                let progress = Math.round(
                ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
                setProgess(progress);
            }
        }).then(res => {
            console.log(res);
            getFile({ name: res.data.name,
                     path: 'http://localhost:4500' + res.data.path
                   })
        }).catch(err => console.log(err))}

    return (
        <div>
            <div className="file-upload">
                <input type="file" />
                <div className="progessBar" style={{ width: progress }}>
                   {progress}
                </div>
                <button onClick={uploadFile} className="upbutton">
                   Upload
                </button>
            <hr />
            {/* displaying received image*/}
            {data.path && <img src={data.path} alt={data.name} />}
            </div>
        </div>
    )
}

/*
function App() {

  const handleChange = (e) => {
    console.log(e);
  }

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
   <div>
     <input type="file" onClick={(e) => handleChange(e)} />
      Bob
   </div>
  );
}

*/

export default App;
