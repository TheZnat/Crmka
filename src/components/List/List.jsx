import React from 'react';
import classNames from 'classnames';

import './List.scss'
import RemoveSvg from '../../assets/img/remove.svg'
import BadgeColor from "../Badge/BadgeColor";
import axios from "axios";


const List = ({items, isRemovable, onClick, onRemove, onClickItem, activeItem}) => {

    const removeList = (item) => {
        if (window.confirm('Вы действительно хотите удалить?')){
            onRemove(item);
            axios.delete('http://localhost:3001/lists/' + item.id).then(() =>{
                onRemove(item.id)
            })
        }
    }

    return (
        <div>
            <ul onClick={onClick} className="list">
                {items.map((item, index) =>
                        <li key={index}
                            className={classNames(item.className,
                            {'active' : item.active
                                    ? item.active
                                    : activeItem && activeItem.id === item.id})}
                            onClick={onClickItem ? (() => onClickItem(item)) : null}
                        >
                            <i>{item.icon ? item.icon :
                                <BadgeColor color={item.color.name}/>
                                }
                            </i>
                            <span>
                                {item.name}
                                {item.tasks && ` (${item.tasks.length})`}
                            </span>
                            {isRemovable === true &&
                                <img
                                    src={RemoveSvg}
                                    alt={'X'}
                                    className='list__remove-icon'
                                    onClick={() => removeList(item)}
                                />}
                        </li>
                    )
                }
            </ul>
        </div>
    );
};

export default List;