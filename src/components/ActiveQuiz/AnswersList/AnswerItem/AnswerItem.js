import classes from './AnswerItem.module.css';
import React from 'react';

const AnswerItem = props => {

   const cls = [classes.AnswerItem]; // массив классов

   if (props.state) {
      cls.push(classes[props.state]); // добавить success или error
   }

   return (
      <li
         className={cls.join(' ')}
         onClick={() => props.onAnswerClick(props.answer.id)} // Передача id нажатого ответа
      >
         {props.answer.text}
      </li>
   );
};
export default AnswerItem;