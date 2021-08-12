import React from "react";

class TypingTest extends React.Component {
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
        <div className="textbody">
          <div className="text">Typing Test</div>
        </div>
      </div>
    );
  }

  render() {
    return this.renderTypingTest();
  }
}

export default TypingTest;
