import {combineReducers} from 'redux';
// подключаем редьюсеры
import quizReducer from './quiz';
import createReducer from './create';
import authReducer from './auth';

export default combineReducers({
   quiz: quizReducer,
   create: createReducer,
   auth: authReducer
});