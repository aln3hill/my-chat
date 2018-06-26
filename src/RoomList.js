import React, { Component } from 'react';


class RoomList extends Component {
  constructor(props){
    super(props);

    this.state = {
      rooms: [],
      value:''
    };
    this.roomsRef = this.props.firebase.database().ref('Rooms');
    this.addRoom = this.addRoom.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
       this.roomsRef.on('child_added', snapshot => {
        console.log("didMount");
         const room = snapshot.val();
         room.key = snapshot.key;
        this.setState({ rooms: this.state.rooms.concat( room ) });

       });
     }

     handleChange(event) {
       this.setState({value: event.target.value});
     }

    addRoom(event){
      this.roomsRef.push({
        name: this.state.value
      });
      alert("A room was created: " + this.state.value);
      event.preventDefault();
      this.setState({value: ''});
    }



  render() {

    return (
      <div className="room">
          <h1>My Chat</h1>

          <ul>
          {

            this.state.rooms.map( (room) => {
              console.log("hello " + room.key );
              console.log(room.name);
              return (<li key={room.key} onClick={() => this.props.setActiveRoom(room)}>{room.name}</li>);

            })
          }
          </ul>

          <form onSubmit={this.addRoom}>
            <label>
              Room name:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
              <input type="submit" value="Submit"/>
              </form>
      </div>

    );
  }
}

export default RoomList;
