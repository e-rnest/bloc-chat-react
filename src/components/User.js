import React, { Component } from 'react';

class User extends Component {
	
	handleSignIn = () => {
		const provider = new this.props.firebase.auth.GoogleAuthProvider();
		this.props.firebase.auth().signInWithPopup(provider)
			.then((result) => {
				var user = result.user;
				this.props.setUser(user);
			})
			.catch(function(error) {
				// Handle Errors here.
			});
	}

	handleSignOut = () => {
		this.props.firebase.auth().signOut()
			.then( () => {
				// Sign-out successful.
			})
			.catch(function(error) {
				// An error happened.
			});
	}

	componentDidMount() {
		this.props.firebase.auth().onAuthStateChanged( user => {
			this.props.setUser(user);
		});
	}

    render() {
        return(
            <section>
				<p className="display-name">{this.props.user ? 'Hello, ' + this.props.user.displayName : 'Hello Guest, would you like to sign in?'}</p>
				<button onClick={this.handleSignIn}>Sign In</button>
				<button onClick={(e) => this.handleSignOut(e)}>Sign Out</button>
			</section>
        )
    }
}

export default User;