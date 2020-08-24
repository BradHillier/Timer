import React from 'react';
// eslint-disable-next-line
import ReactDOM from 'react-dom';

// organize methods
// especially ones involved in manipulating userInput
// organize by scope 

export default  class Display extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hours: 0,
            minutes: 0,
            seconds: 0
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const isPaused = this.props.isPaused
        if (prevProps.isPaused !== isPaused) {
            isPaused === true ?
this.pauseTimer() : this.startTimer();
        }

        const userInput = this.props.userInput;
        if (prevProps.userInput !== userInput) {
            this.formatTime();
        }
        
        const minutes = this.state.minutes;
        const mode = this.state.mode;
        if (prevState.minutes !== minutes 
&& mode === 'countDown') {
            this.adjustMinutes();
        }
    }

    formatTime() {
        const userInput = this.props.userInput;

        const hours =
Number(userInput.slice(0, -4)|| 0);
        const minutes = 
Number(userInput.slice(-4, -2) || 0);
        const seconds = 
Number(userInput.slice(-2) || 0);

        this.setState(state => ({
            hours: hours,
            minutes: minutes,
            seconds: seconds
        }));
    }

    startTimer() {
        this.adjustSeconds();
        this.timer = setInterval(
            () => this.tick(), 1000);
    }

    pauseTimer() {
        clearInterval(this.timer);
        this.syncUserInput();
    }

    syncUserInput() {
        const time = this.appendZero();
        const concatTime = time[0].concat(time[1], time[2]);
        this.props.syncUserInput(concatTime);
    }

    adjustSeconds() {
        if (this.state.seconds > 59) {
            this.setState(state => ({
                minutes: Number(state.minutes) + 1,
                seconds: state.seconds - 60
            }));
        }
    }

    adjustMinutes() {
        if (this.state.minutes > 59) {
            this.setState(state => ({
                hours: Number(state.hours) + 1,
                minutes: state.minutes - 60
            }));
        }
    }

    tick() {
        const hours = this.state.hours;
        const minutes = this.state.minutes;
        const seconds = this.state.seconds;

        if (seconds > 0) {
            this.setState(state => ({
                seconds: state.seconds - 1
            }));
        }

        if (seconds === 0) {
            if (minutes > 0) {
                this.setState(state => ({
                    minutes: state.minutes - 1,
                    seconds: 59
                }));
            } else if (minutes === 0 && hours > 0) {
                this.setState(state => ({
                    hours: state.hours - 1,
                    minutes: 59,
                    seconds: 59
                }));
            } else {
                this.props.toggleAlarm('play');
                this.pauseTimer();
            }
        }
    }

    // combine with formatTime?
    // formatTime controls state
    // timeAsString contros UI
    appendZero() {
        const hours = this.state.hours.toString();
        const minutes = this.state.minutes.toString();
        const seconds = this.state.seconds.toString();
        const time = [hours, minutes, seconds];
        
        for (let i = 0; i < time.length; i++) {
            if (time[i].length === 1) {
                time[i] = '0' + time[i];
            } 
        };
        return time;
    }

    formatDisplayedTime() {
        const time = this.appendZero();
        return (
            this.state.hours > 0 ?
time[0].concat(':',time[1],time[2]) 
            : 
            time[1].concat(':',time[2])
        );
     }
    
    render() {
        return (
            <div id='display'>
                 {this.formatDisplayedTime()}
            </div>   
        );  
    }
}


