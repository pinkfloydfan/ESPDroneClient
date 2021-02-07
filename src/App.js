import React from 'react'
import logo from './logo.svg';
import './App.css';


import HomePage from './Components/HomePage'

class App extends React.Component {

  constructor(props) {
    super(props)
    //const socket = io('localhost:3001', { transports: ["websocket"] })
    //socket.emit("message", 123456)
    /*
    this.state = {
      socketClient: socket
    }
    */
  }

  render() {
    return (
      <HomePage/>
    );
  }

}

export default App;

//    const socket = io('ws://192.168.4.22:80', { transports: ["websocket"] })
