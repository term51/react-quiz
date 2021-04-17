import React from 'react';
import classes from './QuizList.module.css';
import {NavLink} from 'react-router-dom';


export default class QuizList extends React.Component {
   renderQuizes() {
      return [1, 2, 3].map((quizId, index) => {
         return (
            <li key={index}>
               <NavLink to={'/quiz/' + quizId}>
                  Тест {quizId}
               </NavLink>
            </li>
         );
      });
   }

   render() {
      return (
         <div className={classes.QuizList}>
            <div>
               <h1>Список тестов</h1>
               <ul>
                  {this.renderQuizes()}
               </ul>
            </div>
         </div>
      );
   }
}