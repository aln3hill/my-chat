import React, { Component } from 'react';


class MessageList extends Component {
  constructor(props){
    super(props);

    this.state={
      messages: []
    };
    this.roomsRef = this.props.firebase.database().ref('Rooms');
  }



render (){
  return(
    <div id="messageList">
      <h1>Room Name will be shown here</h1>
      <h3>Chat message 1</h3>
      <h3>Chat message 2</h3>
      <h3>Chat message 3</h3>
      </div>
  );
}

}
export default MessageList;
