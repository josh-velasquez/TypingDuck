import React from "react";

class TypingSpeed extends React.Component {
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
        {/* <div className="textbody" contentEditable="true"> */}
        <div className="textbody">
          <div className="text">Speed Test</div>
        </div>
      </div>
    );
  }

  render() {
    return this.renderTypingTest();
  }
}

export default TypingSpeed;
