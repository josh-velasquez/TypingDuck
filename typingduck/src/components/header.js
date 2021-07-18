import React from 'react'
import Logo from '../assets/rubber-duck.png';

class Header extends React.Component {
    render() {
        return (
            <div className="ui stackable menu inverted">
                <div className="item">
                    <img className="logo" src={Logo} />
                </div>
                <div className="right menu">
                    <a className="item">typing speed</a>
                    <a className="item">typing test</a>
                </div>
            </div>
        )
    }
}

export default Header;