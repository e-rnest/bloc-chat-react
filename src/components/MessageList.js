import React, { Component } from 'react';

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messageList: [],
        }
        this.messagesRef = this.props.firebase.database().ref('messages');    
    }

    loadMessages() {
        const messageList = [];
        this.messagesRef.on('child_added', snapshot => {
            if (snapshot.val().roomId === this.props.activeRoomKey) {
                const message = snapshot.val();
                message.key = snapshot.key;
                messageList.push( message );
            }
            this.setState({
                messageList: messageList,
            })
        });
    }

    componentDidMount() {
        this.loadMessages();
    }

    componentDidUpdate(prevProps) {
        if (this.props.activeRoomKey !== prevProps.activeRoomKey) {
            this.loadMessages();
        }
    }

    render() {
        return (
            <section>
                <h2>{this.props.activeRoomName}</h2>
                {this.state.messageList.map( (message) => 
                    <p className="message" key={message.key}>
                        <span className="username">{message.username}</span>
                        <span className="sent-at">({message.sentAt}): </span>
                        {message.content}
                    </p>
                )}
            </section>
        )
    }
}

export default MessageList