import React, { Component } from 'react';

class RoomList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rooms: []
		};
		this.roomsRef = this.props.firebase.database().ref('rooms');
	}

	componentDidMount() {
		this.roomsRef.on('child_added', snapshot => {
			const room = {};
			room.val = snapshot.val();
			room.key = snapshot.key;
			this.setState({ rooms: this.state.rooms.concat( room ) });
			});
		}

	render() {
		return (
			<section className="room-sidebar">
				<h2>Chat</h2>
				<ul className="room-list">
					{this.state.rooms.map( (room) => 
						<li className="room" key={room.key}>
							{room.val}
						</li>
					)}
				</ul>
			</section>
		)
	}
}

export default RoomList