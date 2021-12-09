import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BaseLayout from './components/layout/BaseLayout';
import reducer from './reducers';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import CountryComparison from './components/CountryComparison';
import CountryInformation from './components/CountryInformation';
import Information from './components/Information';

const saveToLocalStorage = (reduxGlobalState) => {

  
  
  // serialization = converting js obj to string

  try {
    const serializeState = JSON.stringify(reduxGlobalState);
    localStorage.setItem('state', serializeState)

  } 
  catch (err) {
    console.log(err);
  }
}


const loadFromLocalStorage = () => {
  // de-serialization = converting string to an object

  const serializedState = localStorage.getItem('state');

  if(serializedState == null){
    return undefined;
  }
  else{
    return JSON.parse(serializedState);
  }

}

const persistedState = loadFromLocalStorage();

const store = createStore(reducer, persistedState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(() => {

  // happens every time there is a change to global state
  saveToLocalStorage(store.getState())

})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <BaseLayout>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/countrycomparison" element={<CountryComparison />} />
            <Route path="/countryinformation" element={<CountryInformation />} />
            <Route path="/information" element={<Information />} />
          </Routes>
        </BaseLayout>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);



