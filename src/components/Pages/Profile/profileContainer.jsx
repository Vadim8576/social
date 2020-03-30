import React from 'react';
import Profile from './profile';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { connect } from 'react-redux';
import { addPost, setUserProfile, getUserProfile, getUserStatus, updateStatus } from '../../Redux/profileReducer';
import { withRouter, Redirect } from 'react-router-dom';
import withAuthRedirect from '../../../hoc/withAuthRedirect';
import { compose } from 'redux';

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        // 6446 - мой ID
        if(!userId) {
            userId = this.props.authorizedUserId; //по умолчанию запрашиваем свою страницу
            // если и сейчас нет userId, редирект на логин
            if(!userId) {
                this.props.history.push('/login');
            }
        }
        
        this.props.getUserProfile(userId);
        this.props.getUserStatus(userId);
        
    }

    render() {
        if(!this.props.isAuth) {
            return <Redirect to={'/login'} />
        }
        return (
           <>
                <ProfileInfo {...this.props} staus={this.props.status}
                    updateStatus={this.props.updateStatus} />
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
        status: state.profilePage.status,
        isAuth: state.auth.isAuth,
        authorizedUserId: state.auth.userId
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
    connect(mapStateToProps, {addPost, setUserProfile, getUserProfile, getUserStatus, updateStatus}),
    withRouter,
    withAuthRedirect
)(ProfileContainer);
