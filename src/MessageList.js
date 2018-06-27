import React, { Component } from 'react';


class MessageList extends Component {
  constructor(props){
    super(props);

    this.state={
      messages: []
    };
    this.messagesRef = this.props.firebase.database().ref('Messages');
    this.isEqual = this.isEqual.bind(this);
  }

  isEqual(x, y){
    if (x == y){
      return true;
    }
    else return false;
  }

  componentDidMount() {

        let activeRoom = this.props.roomID;
        this.messagesRef.on('child_added', snapshot => {
          console.log("didMountMessenger");
        const message = snapshot.val();
        message.key = snapshot.key;
        this.setState({ messages: this.state.messages.concat( message ) });


      });
       }



  render (){
    return(
      <div id="messageList">
        <h1>Welcome to My Chat</h1>
        <h2>{this.props.roomName}</h2>


        {
          this.state.messages.map( (mess, index) => {


            return (this.isEqual(this.props.roomID, mess.roomId) ? <div className="messageItem">
                                                                  <h3 className="username">{mess.username}</h3>
                                                                  <p className="content">{mess.content}</p>
                                                                  <p className="sentAt">{mess.sentAt}</p>
                                                                  </div> : <p></p>);
          })
        }



        </div>
    );
  }

}
export default MessageList;
