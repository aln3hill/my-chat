import React, { Component } from 'react';


class RoomList extends Component {
  constructor(props){
    super(props);

    this.state = {
      rooms: []
    };
    this.roomsRef = this.props.firebase.database().ref('Rooms');
  }

  componentDidMount() {
       this.roomsRef.on('child_added', snapshot => {
        console.log("didMount");
         const room = snapshot.val();
         room.key = snapshot.key;
        this.setState({ rooms: this.state.rooms.concat( room ) });

       });
     }


  render() {



    return (
      <div className="room">
          <h1>My Chat</h1>

          <ul>
          {

            this.state.rooms.map( (room, key) => {
              console.log("hello" + key);
              console.log(room);
              return <li key={key}>{room.name}</li>

            })
          }
          </ul>

      </div>

    );
  }
}

export default RoomList;
