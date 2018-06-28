import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js'
import User from './components/User.js'
import * as firebase from 'firebase';

// Initialize Firebase
var config = {
	apiKey: "AIzaSyDO93EoPLZD7YG7tf2R1ue36AjheSWCFYk",
	authDomain: "react-chat-b24e6.firebaseapp.com",
	databaseURL: "https://react-chat-b24e6.firebaseio.com",
	projectId: "react-chat-b24e6",
	storageBucket: "react-chat-b24e6.appspot.com",
	messagingSenderId: "24381140605"
};
firebase.initializeApp(config);

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeRoomKey: '',
			activeRoomName: '',
			user: '',
		};
	}

	setUser = (user) => {
		this.setState({
			user: user,
		})
	}

	handleSetActiveRoom = (roomKey,roomName) => {
		this.setState({
			activeRoomKey: roomKey,
			activeRoomName: roomName,
		});
	}

	render() {
		return (
			<div className="App">
				<User firebase={firebase} user={this.state.user} isLoggedIn={this.state.isLoggedIn} setUser={this.setUser}>
				</User>
				<RoomList firebase={firebase} activeRoomKey={this.state.activeRoomKey} handleSetActiveRoom={this.handleSetActiveRoom}>
				</RoomList>
				<MessageList firebase={firebase} user={this.state.user} activeRoomKey={this.state.activeRoomKey} activeRoomName={this.state.activeRoomName}>
				</MessageList>
			</div>
		);
	}
}

export default App;