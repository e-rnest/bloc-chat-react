import React, { Component } from 'react';

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messageList: [],
            message: '',
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

    handleMessageInput(e) {
        let message = e.target.value;
        this.setState({
            message: message,
        })
    }

    validateMessage = () => {
        if (this.props.activeRoomKey === "" || this.props.user === null || this.state.message === "") {
            console.log('Message issue');
            return false;
        }
        return true;
    }

    formatTime(ms) {
        let date = new Date(ms);
        return ( date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) );
    }

    handleMessageSend = (e) => {
        e.preventDefault();
        if( this.validateMessage() ) {
            this.messagesRef.push({
                content: this.state.message,
                roomId: this.props.activeRoomKey,
                sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
                username: this.props.user.displayName.split(' ')[0],
            });
            this.setState({ message: '' });
        }

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
                        <span className="sent-at"> ({ this.formatTime(message.sentAt) }): </span>
                        {message.content}
                    </p>
                )}

                <form onSubmit={(e) => this.handleMessageSend(e) }>
                    <input type="text" value={this.state.message} onChange={(e)=>this.handleMessageInput(e)} placeholder={`Message ${this.props.activeRoomName}`} />
                    <button>Send</button>
                </form>

            </section>
        )
    }
}

export default MessageList