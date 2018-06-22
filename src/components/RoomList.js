import React, { Component } from 'react';

class RoomList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rooms: [],
			newRoomName: '',
		};
		this.roomsRef = this.props.firebase.database().ref('rooms');
	}

	componentDidMount() {
		this.roomsRef.on('child_added', snapshot => {
			const room = snapshot.val();
			room.key = snapshot.key;
			this.setState({ rooms: this.state.rooms.concat( room ) })
		  });
	}

	handleChatNameEntry(e) {
		this.setState({ newRoomName: e.target.value });
	}

	verifyRoomName(name) {
		if(name.length < 1) { console.log('No name entered'); return false; }
		return true;
	}

	createRoom(e) {
		e.preventDefault();
		if (this.verifyRoomName(this.state.newRoomName)) {
			this.roomsRef.push({
				name: this.state.newRoomName
			});
			this.setState({ newRoomName: '' });
		}
	}

	render() {
		return (
			<section className="room-sidebar">
				<h2>Chat</h2>
				<ul className="room-list">
					{this.state.rooms.map( (room) => 
						<li className="room" key={room.key}>
							{room.name}
						</li>
					)}
				</ul>
				<form className="create-chat" onSubmit={(e) => this.createRoom(e)}>
					<input type="text" value={this.state.newRoomName} onChange={ (e) => this.handleChatNameEntry(e)} placeholder={'New Room Name'}></input>
					<button type="submit" value="Submit">Submit</button>
				</form>
			</section>
		)
	}
}

export default RoomList