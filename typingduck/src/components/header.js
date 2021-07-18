import React from 'react'
import Logo from '../assets/rubber-duck.png';

class Header extends React.Component {
    render() {
        return (
            <div className="ui stackable menu">
                <div className="item">
                    <img className="logo" src={Logo} />
                </div>
                <div class="right menu">
                    <a class="item">typing speed</a>
                    <a class="item">typing test</a>
                </div>
            </div>
        )
    }
}

export default Header;