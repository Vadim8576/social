import React from 'react';
import Profile from './profile';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { connect } from 'react-redux';
import { addPost, updateNewPostText, setUserProfile, getUserProfile } from '../../redux/profileReducer';
import { withRouter } from 'react-router-dom';

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        this.props.getUserProfile(userId);
        
    }

    render() {
        return (
           <>
               <ProfileInfo {...this.props} />
                <Profile {...this.props} />
           </>
            
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

// ProfileContainer должен получить данные из URLa,
// поэтому засовываем его в функцию withRouter, которая возвращает еще один компонент - 
// WithUrlDataContainerComponent, который и закинет в ProfileContainer данные из URLa
let WithUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, {updateNewPostText, addPost, setUserProfile, getUserProfile})(WithUrlDataContainerComponent);

