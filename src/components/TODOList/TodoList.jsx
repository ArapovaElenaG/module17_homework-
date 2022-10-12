import React from 'react';
import './TodoList.css';
import Input from './Input/Input';
import Button from './Button/Button';
import List from './List/List';

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            tasks: [],
            completedTasks: 0,
            clickedTotal: false
        }
    }

    // функция предачи состояния из дочернего компонента-инпут в родителя
    changeInput = (event) => {
        this.setState ({inputValue: event.target.value})
    }

    // функция добавления новой задачи в массив состояния родителя из inputValue при нажатии дочернего компонента Button-Add
    clickAdd = () => {
        // если инпут пустой - выходим
        const {inputValue, tasks} = this.state;
        if(!inputValue) {return}

        // если задача повторяется - выходим
        let index = tasks.findIndex(item => item.value === inputValue);
        console.log(index);
        if(index >= 0) {
            alert('Эта задача уже имеется');
            return
        }

        // обновляем состояние - добавляем в массив объект задачи и обнуляем инпут
        this.setState ({
            tasks: [{
                value: inputValue,
                clicked: false,
                complitingTime: '',
            }, ...tasks],
            inputValue: '',
        })
    }

    //функция получения состояния List
    getStateList = (taskName, clicked, info) => {
        const {tasks} = this.state;
        const updatedTasks = tasks.map(task => {
            // если при переборе встречаем таск с нужным нам value, меняем его значение checked на противоположное
            if (task.value === taskName) {
                return {value: taskName, clicked: !clicked, complitingTime: info}
            }
            // если value не совпадает, возвращаем таск без изменений
            else return task
        })
        this.setState ({tasks: updatedTasks})
    }

    // функция меняет состояние родителя при нажатии дочернего компонента Button-Show 
    showNumber = () => {
        const {clickedTotal} = this.state;
        if (clickedTotal) {this.setState ({clickedTotal: false})}
        else {this.setState ({clickedTotal: true})}
    }

    // функция удаления задач - передается дочернему компоненту Button-remove
    removeTask = (taskValue) => {
        const {tasks} = this.state;
        let index = tasks.findIndex(item => item.value === taskValue);
        let removed = tasks.splice(index, 1);
        this.setState ({tasks: tasks})
    }



    render () {
        let {inputValue, tasks, clickedTotal} = this.state;
        let completedTasks = tasks.filter(item => {
            if (item.clicked) {return item}
        })

        return (
            <>
                <h2>TODO List</h2>

                <div className="wrapperInput">
                    <Input 
                        onChange={this.changeInput}
                        value={inputValue}
                    />
                    <Button onClick={this.clickAdd} name="Add" className="Add"/>
                </div>

                <div className='wrapperTasks'>
                    {tasks.map (item => {
                        return (
                            <div className='wrapperTaskRemove'>
                                <List 
                                    key={item.value}
                                    taskValue={item.value}
                                    taskClicked={item.clicked}
                                    taskComplitingTime={item.complitingTime}
                                    getState={this.getStateList}
                                    clickRemove={this.removeTask}
                                />
                            </div>
                        )
                    })}
                </div>

                <Button name="Show the number of completed tasks" className="Show" onClick={this.showNumber}/>

                {clickedTotal && <div className={`completingAll ${tasks.length === completedTasks.length ? 'greenTotal' : 'yellowTotal'}`}>{clickedTotal && `Total tasks: ${tasks.length}, completed tasks: ${completedTasks.length}`}</div>}
            </>
        )
    }
}

export default TodoList;