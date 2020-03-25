import React from 'react';
import css from './profileInfo.module.css';


class ProfileStatus extends React.Component {
    state = {
        editMode: false
    }

    // Если здесь создать эту функцию обычным способом, потеряется контекст, поэтому делаем стрелочную функцию
    activateEditMode = () => {
        console.log(this.state.editMode); // выведет false

        // устанавливаем новый локальный state для перерисовки компонента
        this.setState( {editMode: true} );

        console.log(this.state.editMode); // тоже выведет false, так как setState асинхронна
    }

    deactivateEditMode = () => {
        this.setState( {editMode: false} );
    }

    render() {
        return (
        <>
            {!this.state.editMode &&
                <div>
                    <span onDoubleClick={ this.activateEditMode }>{this.props.status}</span>
                </div>
            }
            {this.state.editMode &&
                <div>
                    <input autoFocus={true} onBlur={ this.deactivateEditMode } value={this.props.status} />
                </div>
            }
        </>)
    };
}

export default ProfileStatus;