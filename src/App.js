import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './RoomList';
import MessageList from './MessageList';
import User from './User';

var config = {
   apiKey: "AIzaSyCPqBcY_zC1A65EvAVAHkMtBVccx8-ZN28",
   authDomain: "my-chat-ab00c.firebaseapp.com",
   databaseURL: "https://my-chat-ab00c.firebaseio.com",
   projectId: "my-chat-ab00c",
   storageBucket: "my-chat-ab00c.appspot.com",
   messagingSenderId: "496043857317"
 };

 const dbApp = firebase.initializeApp(config);
 const provider = new firebase.auth.GoogleAuthProvider();


class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      activeRoom: {},
      activeRoomID: "",
      user: ""
    }
    this.setActiveRoom = this.setActiveRoom.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  setActiveRoom(room) {
    this.setState({
      activeRoom: room,
      activeRoomID: room.key
    });
  }

  setUser(user){
    console.log("user in app.js:");
    console.log(user);


      console.log(user.displayName);
      this.setState({
        user: user
      });


  }




  render() {

    return (
      <div>
      <User firebase={dbApp} auth={provider} setUser={this.setUser} user={this.state.user.displayName}/>
      <RoomList firebase={dbApp} setActiveRoom={this.setActiveRoom}  />
      <MessageList firebase={dbApp} roomName={this.state.activeRoom.name} roomID={this.state.activeRoomID} user={this.state.user.displayName}/>

      </div>
    );
  }
}

export default App;
