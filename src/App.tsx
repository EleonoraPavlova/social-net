import React from 'react';
import './styles/App.scss';

import Header from './common/Header/Header';
import Nav from "./components/Nav/Nav";
import Footer from "./common/Footer/Footer";
import { HashRouter } from 'react-router-dom'
import RoutesComponents from "./routes";



function App() {
  return (
    <div className="App">
      <HashRouter>
        < Header />
        < Nav />
        < RoutesComponents />
        < Footer />
      </HashRouter>
    </div >

  );
}

export default App;

