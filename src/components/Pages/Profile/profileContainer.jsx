import Posts from './posts';
import { connect } from 'react-redux';
import {addPostActionCreator, updateNewPostTextActionCreator} from '../../Redux/profileReducer';



//////////////////////////////// react-redux
let mapStateToProps = (state) => {
    return {
        profilePage: state.profilePage,
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

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Posts);
/////////////////////////////////////

export default ProfileContainer;