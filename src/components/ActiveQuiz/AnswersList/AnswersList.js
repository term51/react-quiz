import classes from './AnswersList';
import AnswerItem from './AnswerItem/AnswerItem';
import React from 'react';

const AnswersList = props => (
   <ul className={classes.AnswersList}>
      {props.answers.map((answer, index) => {
         return (
            <AnswerItem
               key={index}
               answer={answer}
               onAnswerClick={props.onAnswerClick}
               state={props.state ? props.state[answer.id] : null} // проверка на пустоту и передача значения объекта
            />
         );
      })}
   </ul>
);

export default AnswersList;