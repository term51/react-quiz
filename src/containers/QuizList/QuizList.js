import React from 'react';
import classes from './QuizList.module.css';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

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

   componentDidMount() {
      axios.get('https://course-react-quiz-default-rtdb.firebaseio.com/quiz.json').then(response => {
         console.log(response);
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