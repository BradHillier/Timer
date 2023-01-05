 # Timer

This is a simple timer application built with React. It allows the user to set a countdown timer, start and pause the timer, and reset the timer. When the timer reaches 0, an alarm will sound until the user stops it.

## Installation

To run the timer locally, follow these steps:

Clone the repository: git clone https://github.com/BradHillier/Timer.git
Navigate to the project directory: cd Timer
Install the dependencies: npm install
Start the development server: npm start

## Usage
The timer has three modes: "setTime", "countDown", and "alarm". In the "setTime" mode, the user can input a time in the format HHMMSS using the number buttons provided. The user can also start the countdown using the "Start" button or clear their input using the "Clear" button. In "countDown" mode, the timer counts down from the user-specified time and displays the remaining time. The user can pause the countdown using the "Pause" button, and resume the countdown using the "Resume" button. When the countdown reaches 00:00:00, the timer enters "alarm" mode, in which an alarm sound plays. The user can stop the alarm by clicking the "Stop" button. In any mode, the user can return to "setTime" mode by clicking the "Cancel" button.

## Dependencies

The timer is built with the following dependencies:

React
