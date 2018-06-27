import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './RoomList';
import MessageList from './MessageList';

var config = {
   apiKey: "AIzaSyCPqBcY_zC1A65EvAVAHkMtBVccx8-ZN28",
   authDomain: "my-chat-ab00c.firebaseapp.com",
   databaseURL: "https://my-chat-ab00c.firebaseio.com",
   projectId: "my-chat-ab00c",
   storageBucket: "my-chat-ab00c.appspot.com",
   messagingSenderId: "496043857317"
 };

 const dbApp = firebase.initializeApp(config);


class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      activeRoom: {},
      activeRoomID: ""
    }
    this.setActiveRoom = this.setActiveRoom.bind(this);
  }

  setActiveRoom(room) {
    console.log("logging room here:");
    console.log(room);
    this.setState({
      activeRoom: room,
      activeRoomID: room.key
    });

  }

  render() {
    console.log("active room key: " + this.state.activeRoomID);

    return (
      <div>
      <RoomList firebase={dbApp} setActiveRoom={this.setActiveRoom}  />
      <MessageList firebase={dbApp} roomName={this.state.activeRoom.name} roomID={this.state.activeRoomID} />
      </div>
    );
  }
}

export default App;
