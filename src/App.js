import './App.css';
import Pusher from 'pusher-js'

function App() {
  const bob = () => {
      
    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;
  
    var pusher = new Pusher('93bc0f8bfdfe83f0c6a9', {
      cluster: 'us2'
    });

    var channel = pusher.subscribe('my-channel');
    channel.bind("pusher:subscription_count", (data) => {
      console.log(data.subscription_count);
      console.log(channel.subscription_count);
    });
  }

  return (
    <>
      <script src="https://js.pusher.com/7.2/pusher.min.js"></script>
      <h1>Pusher Test</h1>
      <button
      onClick={(e) => bob(e.target.value)}
      >
        Bob
      </button>
    </>
  );
}

export default App;
