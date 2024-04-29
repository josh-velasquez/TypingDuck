import React from "react";
import TypingSpeedResult from "./typingspeedresult";

class TypingSpeed extends React.Component {
  state = {
    characterTyped: 0,
    currentText: "",
    currentTextNum: 0,
    errors: 0,
    timeElapsed: 0,
    timeLimit: 60,
    timer: null,
    timerStarted: false,
    totalErrors: 0,
  };

  renderTypingTestResult() {
    return <TypingSpeedResult />;
  }

  init() {
    if (!this.state.timerStarted) {
      this.setState({ timerStarted: true });
    }
    // let text = document.querySelectorAll(".text");
    // console.log(text.content);
    // let userInput = text.split(""); // might not need value
    // this.setState({ characterTyped: this.state.characterTyped + 1, errors: 0 });
    // text.foreact((char, i) => {
    //   let typedChar = userInput[i];
    //   console.log("HERE: " + typedChar);
    // });
  }

  onUserType = (event) => {
    console.log("Test: " + event.key);
    this.init();
    //
  };

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
        <div
          className="textbody"
          contentEditable={true}
          suppressContentEditableWarning={true}
          onKeyDown={this.onUserType}
        >
          <div className="text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </div>
        </div>
      </div>
    );
  }

  render() {
    return this.renderTypingTest();
  }
}

export default TypingSpeed;
