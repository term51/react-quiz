import React from 'react';
import classes from './Auth.module.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import is from 'is_js';

export default class Auth extends React.Component {
   state = {
      isFormValid: false,
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

   // валидация input (значение, правила)
   validateControl(value, validation) {
      if (!validation) {
         return true;
      }
      let isValid = true;
      // Проверка на обязательность поля
      if (validation.required) {
         isValid = value.trim() !== '' && isValid;
      }
      // проверка с помощью библиотеки is_js
      if (validation.email) {
         isValid = is.email(value) && isValid;
      }

      if (validation.minLength) {
         isValid = value.length >= validation.minLength && isValid;
      }

      return isValid;
   }

   onChangeHandler = (event, controlName) => {
      // создание копии formControl, чтобы не вызывать мутаций в state
      const formControls = {...this.state.formControls};
      const control = {...formControls[controlName]};

      control.value = event.target.value;
      control.touched = true;
      control.valid = this.validateControl(control.value, control.validation);

      formControls[controlName] = control;

      let isFormValid = true;
      Object.keys(formControls).forEach(name => {
         isFormValid = formControls[name].valid && isFormValid;
      });

      this.setState({
         formControls
      });
   };

   // динамическое формирование input из formControls с использованием шаблона UI/Input
   renderInputs() {
      // получить массив ключей
      return Object.keys(this.state.formControls).map((controlName, index) => {
         const control = this.state.formControls[controlName];

         return (
            <Input
               key={controlName + index}
               type={control.type}
               value={control.value}
               valid={control.valid}
               touched={control.touched}
               label={control.label}
               shouldValidate={!!control.validation}
               errorMessage={control.errorMessage}
               onChange={(event) => this.onChangeHandler(event, controlName)}
            />
         );
      });
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
                     disabled={!this.state.isFormValid}
                  >
                     Войти
                  </Button>
                  <Button
                     type="primary"
                     onClick={this.registerHandler}
                     disabled={!this.state.isFormValid}
                  >
                     Зарегистрироваться
                  </Button>

               </form>
            </div>
         </div>
      );
   }
}