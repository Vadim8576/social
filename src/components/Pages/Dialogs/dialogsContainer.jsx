// import React from 'react';
import Dialogs from './dialogs';
import { connect } from 'react-redux';
import { sendMessageActionCreator, updateNewMessageBodyActionCreator } from '../../../components/redux/dialogsReducer';
import withAuthRedirect from '../../../hoc/withAuthRedirect';
import { compose } from 'redux';



//////////////////////////////// react-redux
let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
        newMessageBody: state.dialogsPage.newMessageBody
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        onNewMessageChange: (e) => {
            let body = e.currentTarget.value;
            dispatch( updateNewMessageBodyActionCreator(body) );
        },
        onSendMessageClick: () => dispatch( sendMessageActionCreator() )
    }
}





// это HOC - компонент высшего порядка (Hight Order Component)
// оборачиваем им Dialogs для того чтобы вынести логику Редиректа
// и использовать ее в других компонентах
// компонент Dialogs стала с (with) AuthRedirect`ом
// let AuthRedirectComponent = withAuthRedirect(Dialogs);



// const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);
// connect имеет свой метод subscribe,
// который следит,
// когда измениться state (dialogsPage) из mapStateToProps
/////////////////////////////////////////////////
// export default DialogsContainer;
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);