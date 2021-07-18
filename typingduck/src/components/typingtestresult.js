import React from 'react'

class TypingTestResult extends React.Component {
    render() {
        return (
            <div className="center-body">
                <div className="statistics-values">
                    <div className="statistics">
                        time 60 / length 200
                    </div>
                </div>
                <div className="statistics-row">
                    <div className="statistic">
                        <h4>wpm</h4>
                        <p>62</p>
                    </div>
                    <div className="statistic">
                        <h4>cpm</h4>
                        <p>112</p>
                    </div>
                    <div className="statistic">
                        <h4>errors</h4>
                        <p>06</p>
                    </div>
                    <div className="statistic">
                        <h4>accuracy</h4>
                        <p>82%</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default TypingTestResult;