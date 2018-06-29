import React, { Component } from 'react';
import firebase from 'firebase';


class MessageList extends Component {
  constructor(props){
    super(props);

    this.state={
      messages: [],
      value: ""
    };
    this.messagesRef = this.props.firebase.database().ref('Messages');
    this.isEqual = this.isEqual.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addMessage = this.addMessage.bind(this);
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

       handleChange(event) {
         this.setState({value: event.target.value});
       }

       addMessage(event){
         let content = this.state.value;
         let roomId = this.props.roomID;
         let username = this.props.user;

         console.log(username);
         event.preventDefault();
         if(roomId && username){
           this.messagesRef.push({
             content: content,
             roomId: roomId,
             sentAt: firebase.database.ServerValue.TIMESTAMP,
             username: username
           });

           alert("Message sent as: " + username);

         }

         if(roomId && !username){
           this.messagesRef.push({
             content: content,
             roomId: roomId,
             sentAt: firebase.database.ServerValue.TIMESTAMP,
             username: "Guest"
           });

           alert("Message sent as: Guest");
         }

         this.setState({value: ''});
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

        <form onSubmit={this.addMessage}>
          <label>
            Message Text:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
            <input type="submit" value="Send"/>
            </form>


        </div>
    );
  }

}
export default MessageList;
