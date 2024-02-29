import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Routes/App';
import { Provider } from 'react-redux';
import { store } from './Redux/Store/Store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
