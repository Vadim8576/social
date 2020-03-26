
// requiredField - поле, обязательное для заполнения
export const requiredField = value => {
    if(value) return undefined;
    return 'Обязательное поле!';
}


export const maxLengthCreator = (maxLength) => (value) => {
    if(value.length>maxLength) return `Не может привышать ${maxLength} символов`;
    return undefined;
}
