import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

window.SplunkRum && window.SplunkRum.init({
  beaconUrl: 'https://rum-ingest.us0.signalfx.com/v1/rum',
  rumAuth: process.env.REACT_APP_RUM_AUTH_TOKEN,
  app: 'events-app-frontend',
  environment: 'events-app',
  debug: true
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
