import React from 'react'
import TypingTestResult from './typingtestresult'

class TypingTest extends React.Component {
    renderTypingTestResult() {
        return (
            <TypingTestResult />
        )
    }

    renderTypingTest() {
        return (
            <div className="center-body">
                <div className="statistics-values">
                    <div className="statistics">
                        <p>
                            time / length / custom
                        </p>
                    </div>
                    <div className="timer">
                        <p>
                            30 / 60 / 90 / 120
                        </p>
                    </div>
                </div>
                <div className="textbody" contentEditable="true">
                    <div className="text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            this.renderTypingTest()
        )
    }
}

export default TypingTest;