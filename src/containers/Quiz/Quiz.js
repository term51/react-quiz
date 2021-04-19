import React from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/Loader/Loader';
import {connect} from 'react-redux';
import {fetchQuizById, quizAnswerClick, retryQuiz} from '../../store/actions/quiz';

// Отвечает за опрос
class Quiz extends React.Component {


   componentDidMount() {
      this.props.fetchQuizById(this.props.match.params.id);
   }

   componentWillUnmount() {
      this.props.retryQuiz();
   }

   render() {
      return (
         <div className={classes.Quiz}>
            <div className={classes.QuizWrapper}>
               <h1>Ответьте на все вопросы</h1>
               {
                  this.props.loading || !this.props.quiz
                     ? <Loader/>
                     : this.props.isFinished
                     ? <FinishedQuiz
                        results={this.props.results}
                        quiz={this.props.quiz}
                        onRetry={this.props.retryQuiz}
                     />
                     : <ActiveQuiz
                        answers={this.props.quiz[this.props.activeQuestion].answers}
                        question={this.props.quiz[this.props.activeQuestion].question}
                        onAnswerClick={this.props.quizAnswerClick}
                        quizLength={this.props.quiz.length}
                        answerNumber={this.props.activeQuestion + 1}
                        state={this.props.answerState} // передача объекта с id ответа и результирующим классом
                     />
               }
            </div>
         </div>
      );
   }
}

function mapStateTopProps(state) {
   return {
      results: state.quiz.results,
      isFinished: state.quiz.isFinished,
      activeQuestion: state.quiz.activeQuestion,
      answerState: state.quiz.answerState,
      quiz: state.quiz.quiz,
      loading: state.quiz.loading
   };
}

function mapDispatchToProps(dispatch) {
   return {
      fetchQuizById: id => dispatch(fetchQuizById(id)),
      quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
      retryQuiz: () => dispatch(retryQuiz()) // повторить опрос (очищаем state)
   };
}

export default connect(mapStateTopProps, mapDispatchToProps)(Quiz);