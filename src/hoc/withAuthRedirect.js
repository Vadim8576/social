import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


let mapStateToPropsRedirect = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}


// это HOC - компонент высшего порядка (Hight Order Component)

export const withAuthRedirect = (Component) => {

    class RedirectComponent extends React.Component {
        render() {
            // Если не залогинился redirect на компонент Login
            if(!this.props.isAuth) return <Redirect to={'/Login'} />;

            return <Component {...this.props} />
        }
    }


    let ConnectedAuthRedirectComponent = connect(mapStateToPropsRedirect)(RedirectComponent);

    return ConnectedAuthRedirectComponent;
}

export default withAuthRedirect;