import {AUTH_LOGOUT, AUTH_SUCCESS} from '../actions/actionTypes';

const initialState = {
   token: null
};

export default function authReducer(state = initialState, action) {
   switch (action.type) {
      case AUTH_SUCCESS:
         return {
            ...state, token: action.token // сохраняем токен
         };
      case AUTH_LOGOUT:
         return {
            ...state, token: null // обнуляем токен
         };
      default:
         return state;
   }
}