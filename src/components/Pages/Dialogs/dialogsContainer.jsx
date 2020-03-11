// import React from 'react';
import Dialogs from './dialogs';
import { connect } from 'react-redux';
import {sendMessageActionCreator, updateNewMessageBodyActionCreator} from '../../../components/redux/dialogsReducer';


// const DialogsContainer = (props) => {

//     return (
//         <Dialogs store={ props.store }
//             onNewMessageChange={ onNewMessageChange }
//             onSendMessageClick={ onSendMessageClick }
//         />
//     );
// }


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

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;