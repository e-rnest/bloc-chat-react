import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList.js';
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
	render() {
		return (
			<div className="App">
				<RoomList firebase={firebase}>
				</ RoomList>
			</div>
		);
	}
}

export default App;