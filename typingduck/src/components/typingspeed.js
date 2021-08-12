import React from "react";
import TypingSpeedResult from "./typingspeedresult";

class TypingSpeed extends React.Component {
  userPhrase = "";
  phrase =  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  state = {
    index: 0,
    userIndex: 0
  }

  renderTypingTestResult() {
    return <TypingSpeedResult />;
  }

  onUserType = (e) => {
    console.log("TEST" + JSON.stringify(e));
    var correctLetter = false; // Check if the user entered the correct letter
    this.setState({ index: this.state.index + 1, userIndex: correctLetter ?? this.state.userIndex + 1 })
  }

  renderTypingTest() {
    return (
      <div className="center-body">
        <div className="statistics-values">
          <div className="statistics">
            <p>time / length / custom</p>
          </div>
          <div className="timer">
            <p>30 / 60 / 90 / 120</p>
          </div>
        </div>
        <div className="textbody text" contentEditable="true" onInput={this.onUserType}>
          {this.phrase}
        </div>
      </div>
    );
  }

  render() {
    return this.renderTypingTest();
  }
}

export default TypingSpeed;
