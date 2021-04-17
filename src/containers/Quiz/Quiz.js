import React from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';

// Отвечает за опрос
class Quiz extends React.Component {
   state = {
      results: {}, // {[id]:'success || error'}
      isFinished: false,
      activeQuestion: 0,
      answerState: null, // { [id]:'success' }
      quiz: [
         {
            id: 1,
            question: 'Какого цвета небо?',
            rightAnswerId: 2,
            answers: [
               {text: 'Черный', id: 1},
               {text: 'Синий', id: 2},
               {text: 'Красный', id: 3},
               {text: 'Зеленый', id: 4}
            ]
         },
         {
            id: 2,
            question: 'В каком году основали Питер?',
            rightAnswerId: 3,
            answers: [
               {text: '1700', id: 1},
               {text: '1702', id: 2},
               {text: '1703', id: 3},
               {text: '1803', id: 4}
            ]
         }
      ]
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

   componentDidMount() {
      console.log('Quiz ID = ', this.props.match.params.id);
   }

   render() {
      return (
         <div className={classes.Quiz}>
            <div className={classes.QuizWrapper}>
               <h1>Ответьте на все вопросы</h1>
               {
                  this.state.isFinished
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