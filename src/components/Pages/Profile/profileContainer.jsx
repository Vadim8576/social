import React from 'react';
import Profile from './profile';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { connect } from 'react-redux';
import { addPost, updateNewPostText, setUserProfile, getUserProfile } from '../../redux/profileReducer';
import { withRouter } from 'react-router-dom';
import withAuthRedirect from '../../../hoc/withAuthRedirect';
import { compose } from 'redux';

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        // 6446 - мой ID
        if(!userId) userId = 6446; //по умолчанию запрашиваем свою страницу
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




// это HOC - компонент высшего порядка (Hight Order Component)
// оборачиваем им ProfileContainer для того чтобы вынести логику Редиректа
// и использовать ее в других компонентах
// компонент ProfileContainer стал с (with) AuthRedirect`ом

// let AuthRedirectComponent = withAuthRedirect(ProfileContainer);


// ProfileContainer должен получить данные из URLa,
// поэтому засовываем его в функцию withRouter, которая возвращает еще один компонент - 
// WithUrlDataContainerComponent, который и закинет в ProfileContainer данные из URLa
// Это тоже HOC

// компонент AuthRedirectComponent стала с (with) Router`ом

// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);


// connect -  тоже HOC
// export default connect(mapStateToProps, {updateNewPostText, addPost, setUserProfile, getUserProfile})(WithUrlDataContainerComponent);



export default compose(
    connect(mapStateToProps, {updateNewPostText, addPost, setUserProfile, getUserProfile}),
    withRouter,
    withAuthRedirect
)(ProfileContainer);