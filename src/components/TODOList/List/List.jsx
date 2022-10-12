import React from 'react';
import './List.css';
import Checkbox from './Checkbox/Checkbox';
import Button from '../Button/Button';


class List extends React.Component {
    state = {
        clicked: false,
        complitingTime: ''
    }

    // функция передается в дочерний компонент Checkbox - меняет состояние родителя при изменении чекбокса
    clickCheckbox = () => {
        const {clicked} = this.state;
        const {taskValue, taskClicked, getState} = this.props;
        const today = new Date();
        const info = today.toLocaleString();

        if (clicked || taskClicked) {
            this.setState({clicked: false, complitingTime: ''});
        }
        else {
            this.setState({clicked: true, complitingTime: info});
        }
        getState(taskValue, clicked, info);
    }

    render () {
        const {taskValue, taskClicked, taskComplitingTime, clickRemove} = this.props;
        const {clicked, complitingTime} = this.state;

        return (
            <>
                <div className='wrapperTask'>
                    <div className={`wrapperTas ${clicked || taskClicked ? 'greenTask' : 'yellowTask'}`}>
                        <Checkbox 
                            onClick={this.clickCheckbox} 
                            prop={taskValue}
                            checked={taskClicked} 
                        />
                        <div>{taskValue}</div>
                    </div>

                    <p className='completing'>{(clicked || taskClicked) && `Task completed ${complitingTime ? complitingTime : taskComplitingTime}`}</p>
                </div>

                <Button 
                    name="Remove" 
                    className={`remove ${clicked ? 'greenRemove' : 'yellowRemove'}`} 
                    // onClick={clickRemove}
                    onClick = {() => clickRemove(taskValue)}
                />
            </>
            
        )
    }
}


export default List;