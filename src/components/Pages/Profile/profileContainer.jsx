import React from 'react';
import Profile from './profile';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { connect } from 'react-redux';
import {addPost, updateNewPostText, setUserProfile} from '../../redux/profileReducer';
import * as axios from 'axios';
import { withRouter } from 'react-router-dom';

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if(!userId) userId = 2; //по умолчанию запрашиваем свою страницу
        axios
        .get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
        .then(response => {
            // debugger;
            this.props.setUserProfile(response.data);
        })

        // console.log('благодаря withRouter появились новые параменты:');
        // console.log('location и match');
        // (см. console)
        // console.log(this.props);
        
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

// ProfileContainer должен получить данные из URLa,
// поэтому засовываем его в функцию withRouter, которая возвращает еще один компонент - 
// WithUrlDataContainerComponent, который и закинет в ProfileContainer данные из URLa
let WithUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, {updateNewPostText, addPost, setUserProfile})(WithUrlDataContainerComponent);

