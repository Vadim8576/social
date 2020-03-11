import Posts from './posts';
import { connect } from 'react-redux';
import {addPostActionCreator, updateNewPostTextActionCreator} from '../../redux/postsReducer';



//////////////////////////////// react-redux
let mapStateToProps = (state) => {
    return {
        postsPage: state.postsPage,
        newPostText: state.postsPage.newPostText
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

const PostsContainer = connect(mapStateToProps, mapDispatchToProps)(Posts);
/////////////////////////////////////

export default PostsContainer;