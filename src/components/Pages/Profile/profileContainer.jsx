import React from 'react';
import Profile from './profile';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { connect } from 'react-redux';
import { addPost, updateNewPostText, setUserProfile, getUserProfile } from '../../redux/profileReducer';
import { withRouter, Redirect } from 'react-router-dom';

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        // 6446 - мой ID
        if(!userId) userId = 6446; //по умолчанию запрашиваем свою страницу
        this.props.getUserProfile(userId);
        
    }

    render() {

        // Если не залогинился redirect на компонент Login
        if(!this.props.isAuth) return <Redirect to={'/Login'} />

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
        profile: state.profilePage.profile,
        isAuth: state.auth.isAuth
    }
}

// ProfileContainer должен получить данные из URLa,
// поэтому засовываем его в функцию withRouter, которая возвращает еще один компонент - 
// WithUrlDataContainerComponent, который и закинет в ProfileContainer данные из URLa
let WithUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, {updateNewPostText, addPost, setUserProfile, getUserProfile})(WithUrlDataContainerComponent);

