import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Display from './display'
import Controls from './controls'
// eslint-disable-next-line
import { Howl, Howler } from 'howler';

// use routing to handle different modes

// --- Bugs ---
// user input set to 0 after timer runs out
//	instead of an empty string

class App extends React.Component {
	constructor(props) {
		super(props);
		this.updateUserInput = this.updateUserInput.bind(this);
		this.syncUserInput = this.syncUserInput.bind(this);

		// set setTime mode button functions 
		this.clear = this.clear.bind(this);
		this.start = this.start.bind(this);

		// countDown mode button functions 
		this.cancel = this.cancel.bind(this);
		this.togglePause = this.togglePause.bind(this);

		this.toggleAlarm = this.toggleAlarm.bind(this);
		// organize state
		this.state = {
			userInput: '',
			isPaused: true,
			mode: 'setTime',
			alarmPlaying: false
		}
	}

	updateUserInput(time) {
		if (this.state.userInput.length < 5) {
			this.setState(state => ({
				userInput: this.state.userInput + time
			}));
		}
	}

	syncUserInput(time) {
		this.setState(state => ({
			// removes any leading zeros
			userInput: Number(time).toString()
		}));
	}

	clear() {
		this.setState(state => ({
			userInput: ''
		}));
	}

	start() {
		this.setState(state => ({
			mode: 'countDown',
			isPaused: false
		}));
	}

	cancel() {
		this.setState(state => ({
			mode: 'setTime',
			isPaused: true
		}));
	}

	togglePause() {
		this.setState(state => ({
			isPaused: !state.isPaused
		}));
	}

	toggleAlarm(input) {
		if (input === 'play') {
			alarm.play();
			this.setState(state => ({
				mode: 'alarm'
			}));
		} else {
			alarm.stop();
			this.cancel();
		}
	}

	render() {
		return (
			<div id='timer'>
				<Display
					userInput={this.state.userInput}
					isPaused={this.state.isPaused}
					mode={this.state.mode}

					syncUserInput={this.syncUserInput}

					cancel={this.cancel}
					togglePause={this.togglePause}

					toggleAlarm={this.toggleAlarm}



				/>
				<Controls
					isPaused={this.state.isPaused}
					mode={this.state.mode}

					updateUserInput={this.updateUserInput}

					clear={this.clear}
					start={this.start}

					cancel={this.cancel}
					togglePause={this.togglePause}

					toggleAlarm={this.toggleAlarm}
				/>
			</div>
		)
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('root')
);

const alarm = new Howl({
			src: ['/alarm2.wav'],
			volume: 0.5,
			loop: true
		});


