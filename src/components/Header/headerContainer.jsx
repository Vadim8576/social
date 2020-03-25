import React from 'react';
import Header from './header';
import {Authentication} from '../Redux/authReducer';
import {connect} from 'react-redux';


class HeaderContainer extends React.Component {

    componentDidMount() {

        this.props.Authentication();
        
    }
  
    render() {     
        return (
            <Header {...this.props} />
            )
    }
}

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
   
});


export default connect(mapStateToProps, {Authentication})(HeaderContainer);
