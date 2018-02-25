import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { routes } from './router';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<BrowserRouter>{routes}</BrowserRouter>, document.getElementById('root'));
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../firebase-messaging-sw.js')
    .then(function (registration) {
      console.log('Registration successful, scope is:', registration.scope);
    }).catch(function (err) {
      console.log('Service worker registration failed, error:', err);
    });
}

// registerServiceWorker();
