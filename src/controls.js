import React from 'react';
// eslint-disable-next-line
import ReactDOM from 'react-dom';

export default class Controls extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = 
this.handleClick.bind(this);
    }

    // could turn renderRow into a method on the controls componet, reduce code?

    handleClick(e) {
// change clicked to target Value
        const clicked = e.target.innerHTML;
        if (isNaN(clicked)) {
            clicked === 'Clear' ?
                this.props.clear()
            : 
            clicked === 'Start' ?
                this.props.start() 
            :
            clicked === 'Cancel' ?
                this.props.cancel()
            :
            this.props.togglePause();   
        }else {
            this.props.updateUserInput(clicked);
        }    
    }

    render() {
        if (this.props.mode === 'setTime') {
            return (
            <div id = 'controls'>
                <RenderRow 
                    id='row1'
                    rowItems={[1, 2, 3]}
                    onClick={this.handleClick}
                />
                <RenderRow
                    id='row2'
                    rowItems={[5, 4, 6]}
                    onClick={this.handleClick}
                />
                <RenderRow 
                    id='row3'
                    rowItems={[7, 8, 9]} 
                    onClick={this.handleClick}
                />
                <RenderRow
                    id='row4'
                    rowItems={[0, 'Clear', 'Start']}
                    onClick={this.handleClick}
                />
            </div>
            )
        } else if (this.props.mode === 'countDown') {
            return (
                <div className = 'row'>
                    <Button 
                        value='Cancel'
                        onClick={this.handleClick}
                    />
                    <TogglePause
                        isPaused={this.props.isPaused}
                        togglePause={this.props.togglePause}
                    />
                </div>
            )
        } else if (this.props.mode === 'alarm') {
            return (
                <div id = 'controls'>
                    <RenderRow
                        id = 'alarmControls'
                        rowItems = {['Stop'] }
                        onClick={() => this.props.toggleAlarm('stop')}
                    />
                </div>
            )
        }
    }
}

function RenderRow(props) {
    const row = props.rowItems.map(item =>
        <Button
            value={item}
            key={item}
            onClick={props.onClick}
        />
    );
    return (
        <div className='row'>
            {row}
        </div>
    );
}

function Button(props) {
    return (
        <button 
            id={props.value}
            onClick={props.onClick}
            className="numberInput"    
        >
            {props.value}
        </button>
    );
}

function TogglePause(props) {
    return (
        <button 
            onClick={props.togglePause}
            id={props.isPaused ? 'Resume' : 'Pause'}
            className={'togglePause'}
        >
            {props.isPaused ? 'Resume' : 'Pause'}
        </button>
    ) 
}


