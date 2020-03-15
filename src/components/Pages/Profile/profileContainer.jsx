import React from 'react';
import Profile from './profile';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { connect } from 'react-redux';
import {addPost, updateNewPostText, setUserProfile} from '../../Redux/profileReducer';
import * as axios from 'axios';

class ProfileContainer extends React.Component {
    componentDidMount() {
        axios
        .get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
        .then(response => {
            // debugger;
            this.props.setUserProfile(response.data);
        })

       
        
    }
    render() {
        return (
           <div>
               <ProfileInfo {...this.props} />
                <Profile {...this.props} />
           </div>
            
        )
    }
}



let mapStateToProps = (state) => {
    return {
        profilePage: state.profilePage,
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
        profile: state.profilePage.profile
    }
}


export default connect(mapStateToProps, {updateNewPostText, addPost, setUserProfile})(ProfileContainer);

