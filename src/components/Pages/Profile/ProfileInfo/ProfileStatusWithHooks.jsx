import React, { useState } from 'react';
import css from './profileInfo.module.css';


const ProfileStatusWithHooks = (props) => {
    
    // Локальный state (Hook). Установить значение по умолчанию false. Возвращает массив из двух элементов
    // в первом элементе editMode хранится значение (по умолчанию мы установили false),
    // во втором элементе setEditMode хранится функция, которая меняет это значение.
    // при необходимости используется столько state, сколько нужно
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);
    
    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        // this.setState( {editMode: false} );
        // this.props.updateStatus(this.state.status);

        setEditMode(false);
        props.updateStatus(status);
    }

    const onStatusChange = (e) => {
        // this.setState({
        //     status: e.currentTarget.value
        // })
        setStatus(e.currentTarget.value);
    }

    
    return (
    <>
        {!editMode &&
            <div>
                <span onDoubleClick={ activateEditMode }>{props.status || 'пусто'}</span>
            </div>
        }
        {editMode &&
            <div>
                <input onChange={ onStatusChange } autoFocus={true} onBlur={ deactivateEditMode } value={status} />
            </div>
        }
    </>)

}

export default ProfileStatusWithHooks;