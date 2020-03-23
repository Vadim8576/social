import React from 'react';
import css from './profileInfo.module.css';


class ProfileStatus extends React.Component {
    state = {
        editMode : true
    }

    render() {
        return (
        <>
            {!this.state.editMode &&
                <div>
                    <span>{this.props.status}</span>
                </div>
            }
            {this.state.editMode &&
                <div>
                    <input value={this.props.status} />
                </div>
            }
        </>)
    };
}

export default ProfileStatus;