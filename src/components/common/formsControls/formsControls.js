import React from 'react';
import css from './formsControls.module.css';



export const Textarea = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={css.formControl + (hasError?' '+css.error:'')}>
            <div>
                {/* Почему ...input см. в документации к redux-form */}
                <textarea {...input} {...props} />
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}

export const Input = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={css.formControl + (hasError?' '+css.error:'')}>
            <div>
                {/* Почему ...input см. в документации к redux-form */}
                <input {...input} {...props} />
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}

export const CheckBox = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={css.formControl + (hasError?' '+css.error:'')}>
            <div>
                {/* Почему ...input см. в документации к redux-form */}
                <input {...input} {...props} type='checkbox' />
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}