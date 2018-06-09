import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';

var config = {
   apiKey: "AIzaSyCPqBcY_zC1A65EvAVAHkMtBVccx8-ZN28",
   authDomain: "my-chat-ab00c.firebaseapp.com",
   databaseURL: "https://my-chat-ab00c.firebaseio.com",
   projectId: "my-chat-ab00c",
   storageBucket: "my-chat-ab00c.appspot.com",
   messagingSenderId: "496043857317"
 };
 firebase.initializeApp(config);


class App extends Component {
  render() {
    return (
      <RoomList />
    );
  }
}

export default App;
