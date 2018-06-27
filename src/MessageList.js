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

  //HELP NEEDED WITH THE BELOW CODE.
  //Every single time the props changes (when clicking a new room in the application) the last snapshot is being added to the message array and rendered to the DOM.
  // I have tried to to use an IF statement to see if the latest snapshot (stored in const message) already exists in the array with the method array.includes().
  //However, this doesn't solve my issue. Can you see what I should do differently to not add the latest snapshot to the array every single time the props update?  

  componentWillReceiveProps() {

        let activeRoom = this.props.roomID;
        this.messagesRef.on('child_added', snapshot => {
          console.log("didMountMessenger");
        const message = snapshot.val();
        message.key = snapshot.key;
        console.log("last message");
        console.log(this.state.messages[this.state.messages.length-1]);
        console.log(Object.is(message, this.state.messages[this.state.messages.length-1]));

        if(this.state.messages.includes(message)){
          return;
        }
        else {
          this.setState({ messages: this.state.messages.concat( message ) });
        }

      });

      //  console.log(this.state.messages);
       }



  render (){
    return(
      <div id="messageList">
        <h1>Welcome to My Chat</h1>
        <h2>{this.props.roomName}</h2>


        {
          this.state.messages.map( (mess, index) => {
            console.log("mess.roomId:")

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
