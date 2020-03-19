// import React from 'react';
import Dialogs from './dialogs';
import { connect } from 'react-redux';
import {sendMessageActionCreator, updateNewMessageBodyActionCreator} from '../../../components/redux/dialogsReducer';


//////////////////////////////// react-redux
let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
        newMessageBody: state.dialogsPage.newMessageBody,
        isAuth: state.auth.isAuth
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

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);
// connect имеет свой метод subscribe,
// который следит,
// когда измениться state (dialogsPage) из mapStateToProps
/////////////////////////////////////////////////
export default DialogsContainer;