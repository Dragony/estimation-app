import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Backend from './Api/Backend.mjs';
import registerServiceWorker from './registerServiceWorker';

let uuid = document.location.pathname.substr(1);

Backend.getEstimationState(uuid).then(function(listData){
    ReactDOM.render(<App listData={listData} />, document.getElementById('root'));
});
registerServiceWorker();
