import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './components/App';
import { routes } from './router';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<BrowserRouter>{routes}</BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
