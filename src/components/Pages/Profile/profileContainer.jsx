import React from 'react';
import Profile from './profile';
import { connect } from 'react-redux';
import {addPostActionCreator, updateNewPostTextActionCreator} from '../../Redux/profileReducer';


class ProfileContainer extends React.Component {
    render() {
        return (
            <Profile
                onTextareaChange={this.props.onTextareaChange}
                addPost={this.props.addPost}
                posts={this.props.posts} />
        )
    }
}



let mapStateToProps = (state) => {
    return {
        profilePage: state.profilePage,
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        onTextareaChange: (e) => {
            let text = e.currentTarget.value;
            dispatch( updateNewPostTextActionCreator(text) );
        },
        addPost: () => dispatch( addPostActionCreator() )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);

