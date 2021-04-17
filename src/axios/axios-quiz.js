import axios from 'axios';

export default axios.create({
   baseURL:'https://course-react-quiz-default-rtdb.firebaseio.com'
})