import React from 'react';
import './Input.css';


class Input extends React.Component {

    render () {
        const {onChange, value} = this.props;

        return (
            <input 
                type="text" 
                value={value}
                onChange={onChange}
                className="input"
            />

        )
    }
}

export default Input;