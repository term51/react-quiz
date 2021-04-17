import React from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import axios from '../../axios/axios-quiz';
import Loader from '../../components/UI/Loader/Loader';

// Отвечает за опрос
class Quiz extends React.Component {
   state = {
      results: {}, // {[id]:'success || error'}
      isFinished: false,
      activeQuestion: 0,
      answerState: null, // { [id]:'success' }
      quiz: [],
      loading: true
   };

   // функция обработает клик по иерархии компонентов в AnswerItem
   onAnswerClickHandler = (answerId) => {
      // проверка на нежелательные клики
      if (this.state.answerState) {
         const key = Object.keys(this.state.answerState)[0]; // получить ключ ответа
         // если уже был выбран правильный ответ, отменяем работу функции
         if (this.state.answerState[key] === 'success') {
            return;
         }
      }

      const question = this.state.quiz[this.state.activeQuestion];
      const results = this.state.results;

      if (question.rightAnswerId === answerId) {
         if (!results[question.id]) {
            results[question.id] = 'success';
         }

         this.setState({
            answerState: {[answerId]: 'success'},
            results
         });

         const timeout = window.setTimeout(() => {
            // если голосование окончено
            if (this.isQuizFinished()) {
               this.setState({
                  isFinished: true
               });
            } else {
               // следующий вопрос
               this.setState({
                  activeQuestion: this.state.activeQuestion + 1,
                  answerState: null // обнуляем ответ
               });
            }
            window.clearTimeout(timeout); // очистить память
         }, 1000);
      } else {
         results[question.id] = 'error';
         this.setState({
            answerState: {[answerId]: 'error'},
            results
         });
      }
   };

   isQuizFinished() {
      return this.state.activeQuestion + 1 === this.state.quiz.length;
   }

   // повторить опрос (очищаем state)
   retryHandler = () => {
      this.setState({
         activeQuestion: 0,
         answerState: null,
         isFinished: false,
         results: {}
      });
   };

   async componentDidMount() {
      try {
         const response = await axios.get(`/quizes/${this.props.match.params.id}.json`);
         const quiz = response.data;
         this.setState({
            quiz, loading: false
         });
      } catch (e) {
         console.log(e);
      }
   }

   render() {
      return (
         <div className={classes.Quiz}>
            <div className={classes.QuizWrapper}>
               <h1>Ответьте на все вопросы</h1>
               {
                  this.state.loading
                     ? <Loader/>
                     : this.state.isFinished
                     ? <FinishedQuiz
                        results={this.state.results}
                        quiz={this.state.quiz}
                        onRetry={this.retryHandler}
                     />
                     : <ActiveQuiz
                        answers={this.state.quiz[this.state.activeQuestion].answers}
                        question={this.state.quiz[this.state.activeQuestion].question}
                        onAnswerClick={this.onAnswerClickHandler}
                        quizLength={this.state.quiz.length}
                        answerNumber={this.state.activeQuestion + 1}
                        state={this.state.answerState} // передача объекта с id ответа и результирующим классом
                     />
               }
            </div>
         </div>
      );
   }
}

export default Quiz;