import React from 'react';
import './Checkbox.css';



class Checkbox extends React.Component {

    render () {
        const {onClick, prop, checked} = this.props;

        return (
            <div className='wrapperCheckbox'>
                <input type="checkbox" className='checkboxList' id={prop} onClick={onClick} checked={checked ? true : false} />
                <label className="labelList" htmlFor={prop}></label>
            </div>
        )
    }
}


export default Checkbox;