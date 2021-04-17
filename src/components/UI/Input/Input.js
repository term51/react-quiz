import React from 'react';
import classes from './Input.module.css';

// валидация
function isInvalid({valid, touched, shouldValidate}) {
   return !valid && shouldValidate && touched;
}

// универсальный, стилизованный input
const Input = props => {
   const inputType = props.type || 'text';
   const cls = [classes.Input];
   const htmlFor = `${inputType}-${Math.random()}`; // генерация уникальной строки для for


   if (isInvalid(props)) {
      cls.push(classes.invalid);
   }

   return (
      <div className={cls.join(' ')}>
         <label htmlFor={htmlFor}>{props.label}</label>
         <input
            type={inputType}
            id={htmlFor}
            value={props.value}
            onChange={props.onChange}
         />
         {
            isInvalid(props)
               ? <span>{props.errorMessage || 'Введите верное значение'}</span>
               : null
         }

      </div>
   );
};

export default Input;