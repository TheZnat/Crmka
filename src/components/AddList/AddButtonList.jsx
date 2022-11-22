import React, {useEffect, useState} from 'react';
import List from "../List/List";
import BadgeColor from "../Badge/BadgeColor";
import axios from "axios";

import './AddButtonList.scss'
import closeSvg from '../../assets/img/close.svg'


const AddButtonList = ({colors, onAdd}) => {
    const [visiblePopup, setVisiblePopup] = useState(false)
    const [selectedColor, setSelectedColor] = useState(3)
    const [inputValue, setInputValue] = useState('')
    const [isLoading, setLoading] = useState(false)


    useEffect(() => {
        if (Array.isArray(colors)) {
            setSelectedColor(colors[0].id);
        }
    }, [colors]);

    const onClose = () =>{
        setVisiblePopup(false)
        setInputValue('')
        setSelectedColor(colors[0].id)
    }

    const addList = ()=>{
        if (!inputValue){
            alert('Введите название списка')
            return
        }
        setLoading(true)
        axios.post('http://localhost:3001/lists',
            {
            name: inputValue,
            colorId: selectedColor
        })
            .then( ({data})  =>{
                const colorData = colors.filter(c => c.id === selectedColor)[0].name
                const listObj = {...data, color: {name: colorData}}
                onAdd(listObj)
                onClose()
        }).finally(() =>{
            setLoading(false)
        })
    }
    return (
        <React.Fragment>
            <List
                onClick = {() => setVisiblePopup(true)}
                items={[
                {
                    className: 'list__add-button',
                    icon: (<svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 1V15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M1 8H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>),
                    name: 'Добавить список'
                }
            ]}
            />
            {visiblePopup && (<div className='add-list__popup'>
                 <img
                     onClick={onClose}
                     src={closeSvg}
                     alt="x"
                     className="add-list__popup-close-bth"
                 />
                <input
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    type='text'
                    placeholder="Название списка"
                       className='field add-list__popup-field'/>
                    <div className="add-list__popup-colors">
                            {
                                colors.map(color =>
                                    <BadgeColor
                                        onClick={() => setSelectedColor(color.id)}
                                        color={color.name}
                                        key={color.id}
                                        className={selectedColor === color.id && 'active'}
                                    />)
                            }
                    </div>
                    <button
                        onClick={addList}
                        className='button add-list-button'>
                        {isLoading ? 'Добавление... ' : 'Добавить'}
                    </button>
            </div>
            )}
        </React.Fragment>
    );
};

export default AddButtonList;