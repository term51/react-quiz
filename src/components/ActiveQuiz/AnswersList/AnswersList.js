import classes from './AnswersList';

const AnswersList = props => (
   <ul className={classes.AnswersList}>
      {props.answers.map((answer, index) => {

      })}
   </ul>
);

export default AnswersList;