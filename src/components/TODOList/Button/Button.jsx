import React from 'react';
import './Button.css';


class Button extends React.Component {

    render () {
        const {onClick, name, className} = this.props;
        
        return <button className={`button ${className}`} onClick={onClick}>{name}</button>
    }
}

export default Button;