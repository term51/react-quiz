import React from 'react';
import classes from './Auth.module.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';

export default class Auth extends React.Component {
   state = {
      formControls: {
         email: {
            value: '',
            type: 'email',
            label: 'Email',
            errorMessage: 'Введите корректный email',
            valid: false,
            touched: false, // был ли произведен ввод
            validation: {
               required: true,
               email: true
            }
         },
         password: {
            value: '',
            type: 'password',
            label: 'Пароль',
            errorMessage: 'Введите корректный пароль',
            valid: false,
            touched: false, // был ли произведен ввод
            validation: {
               required: true,
               minLength: 6
            }
         }
      }
   };

   loginHandler = () => {

   };

   registerHandler = () => {

   };

   submitHandler = event => {
      event.preventDefault();
   };

   // динамическое формирование input из formControls с использованием шаблона UI/Input
   renderInputs() {
      // получить массив ключей
      const inputs = Object.keys(this.state.formControls).map((controlName, index) => {
         return (
            <Input

            />
         );
      });
      return inputs;
   }

   render() {
      return (
         <div className={classes.Auth}>
            <div>
               <h1>Авторизация</h1>
               <form className={classes.AuthForm} onSubmit={this.submitHandler}>

                  {this.renderInputs()}

                  <Button
                     type="success"
                     onClick={this.loginHandler}
                  >
                     Войти
                  </Button>
                  <Button
                     type="primary"
                     onClick={this.registerHandler}
                  >
                     Зарегистрироваться
                  </Button>

               </form>
            </div>
         </div>
      );
   }
}