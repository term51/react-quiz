import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
// redux
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './store/reducers/rootReducer';
import thunk from 'redux-thunk';

const composeEnhancers =
   typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
         // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
      : compose;

// TODO
//  добавить обработку ошибок в авторизацию
//  вывод авторизированного пользователя в Drawer
//  возможность удаления тестов, написанных тобой


const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
   <React.StrictMode>
      <Provider store={store}>
         <BrowserRouter>
            <App/>
         </BrowserRouter>
      </Provider>
   </React.StrictMode>
);

ReactDOM.render(app, document.getElementById('root')
);

reportWebVitals();
