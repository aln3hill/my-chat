import React, { Component } from 'react';


class MessageList extends Component {
  constructor(props){
    super(props);

    this.state={
      messages: [],
      activeRoomID: ''
    };
    this.messagesRef = this.props.firebase.database().ref('Messages');
  
  }

  componentDidMount() {
    alert(this.props.roomID);
    let activeRoom = this.props.roomID.toString();

        this.messagesRef.on('child_added', snapshot => {
        console.log("didMountMessenger");
        const message = snapshot.val();
        message.key = snapshot.key;
        this.setState({ messages: this.state.messages.concat( message ) });
        console.log(this.state.messages);
       });
     }
  //
  // filterMessages(message){
  //   let roomid = this.state.activeRoomID;
  //   console.log("Viktigt roomID: " +  this.state.activeRoomID);
  //   console.log("Viktigt messID: " + message.roomId);
  //   if (roomid === message.roomId){
  //     return <p>message should display here</p>;
  //   }
  //   else return;
  // }


  render (){

    let roomid = this.props.roomID;
    return(
      <div id="messageList">
      <h1>Welcome to My Chat</h1>
      <h2>{this.props.roomName}</h2>

      <ul>
   {
     this.state.messages.map( (mess) => {
       console.log("message key: " + mess.roomId);
       console.log("roomID as props: " + roomid);
       return( (roomid) ?
                 ('LFPKMhhBfpoFuh6w6XN' === roomid) ? <div><li key={mess.key}><h5>{mess.username}</h5><p>{mess.content}</p></li></div> : <h4>No messages yet in the room </h4>
                 : <div><h5>{mess.username}</h5><p>{mess.content}</p></div>
               )})
   }
      </ul>

        </div>
    );
  }

}
export default MessageList;
