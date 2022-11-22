import React, {useState} from 'react';
import axios from "axios";

import addSvg from "../../assets/img/add.svg";
import './Tasks.scss'

const AddTaskForm = ({list, onAddTask}) => {
    const [visibleFrom, setVisibleFrom] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const toggleFromVisible = () => {
        setVisibleFrom(!visibleFrom)
        setInputValue('')
    }

    const addTask = () => {
        const obj = {
            listId: list.id,
            text: inputValue,
            completed: false,
        }
        setIsLoading(true)
        axios.post('http://localhost:3001/tasks', obj)
            .then(({data}) => {
                onAddTask(list.id, data)
                toggleFromVisible()
        })
            .catch(() => {
            alert('Ошибка при добавление задачи')
        })
            .finally(() => {
                    setIsLoading(false)
        })
    }

    return (
        <div className="tasks__form">
            {visibleFrom ? (
                <div className="tasks__form-field">
                <input
                    type='text'
                    value={inputValue}
                    placeholder="Текст задачи"
                    onChange={e => setInputValue(e.target.value)}
                    className='field add-list__popup-field'
                />
                <button disabled={isLoading} onClick={addTask} className="button">
                    {isLoading ? 'Добавление...' : 'Добавить задачу'}
                </button>
                <button onClick={toggleFromVisible} className="button button--grey">Отмена</button>
            </div>): (
                <div onClick={toggleFromVisible} className="tasks__form-new">
                    <img src={addSvg} alt="+"/>
                    <span>Новая задача</span>
                </div>
            )}

        </div>
    );
};

export default AddTaskForm;