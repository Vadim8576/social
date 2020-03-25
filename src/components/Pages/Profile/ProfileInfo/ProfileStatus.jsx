import React from 'react';
import css from './profileInfo.module.css';


class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        status: this.props.status
    }

    // Если здесь создать эту функцию обычным способом, потеряется контекст, поэтому делаем стрелочную функцию
    activateEditMode = () => {
        console.log(this.state.editMode); // выведет false

        // устанавливаем новый локальный state для перерисовки компонента
        // если менять state напрямую, не будет перерисовки (this.state.editMode = true;)
        this.setState( {editMode: true} );

        console.log(this.state.editMode); // тоже выведет false, так как setState асинхронна
    }

    deactivateEditMode = () => {
        this.setState( {editMode: false} );
        this.props.updateStatus(this.state.status);
    }

    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    render() {
        return (
        <>
            {!this.state.editMode &&
                <div>
                    <span onDoubleClick={ this.activateEditMode }>{this.props.status || 'пусто'}</span>
                </div>
            }
            {this.state.editMode &&
                <div>
                    <input onChange={ this.onStatusChange } autoFocus={true} onBlur={ this.deactivateEditMode } value={this.state.status} />
                </div>
            }
        </>)
    };
}

export default ProfileStatus;