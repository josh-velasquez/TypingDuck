import React from 'react'
import Logo from '../assets/rubber-duck.png';

class Header extends React.Component {
    render() {
        return (
            <div className="ui secondary menu inverted">
                <div className="item">
                    <img className="logo" src={Logo} />
                </div>
                <div className="right menu navigation">
                    <a className="item">speed test</a>
                    <a className="item">typing test</a>
                </div>
            </div>
        )
    }
}

export default Header;