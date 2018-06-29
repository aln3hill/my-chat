import React, { Component } from 'react';


class User extends Component {
  constructor(props){
    super(props);

    this.state ={
      loggedIn: null

    }
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  signIn() {

    console.log(this.props.auth);
    this.props.firebase.auth().signInWithPopup( this.props.auth ).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      let name = user.displayName;
      // this.setState({loggedIn: true});



    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;

      var errorMessage = error.message;
      console.log(errorMessage);
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }



  signOut(){
    this.props.firebase.auth().signOut().then(function() {
      const guest = "Guest";
          alert("signed out successfully");

    }).catch(function(error) {
      console.log("An error happened.");
      console.log(error);
    });
  }


  componentDidMount(){
    console.log("user component mounted");
    this.props.firebase.auth().onAuthStateChanged( user => {
      console.log("user in User.js");
      console.log(user);

      if(user){
      this.props.setUser(user);
    }

    else {
      this.props.setUser("Guest");
    }
    });
  }

  render() {

    return (
      <div>

       <button onClick={this.signOut}>Log Out</button>
       <button onClick={this.signIn}>Log In</button>
       <h3>{this.props.user}</h3>

      </div>
    );



  }

}

export default User;
