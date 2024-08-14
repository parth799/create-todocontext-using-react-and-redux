import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Home from './components/Home';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Provider store={store}>
      <ToastContainer position="top-right" autoClose={5000} />
      <Home />
    </Provider>
  );
}

export default App;
