import React from 'react';
import './styles/App.scss';
import { Header } from './common/Header/Header';
import { Nav } from "./components/Nav/Nav";
import { Footer } from "./common/Footer/Footer";
import RoutesComponents from "./routes";
import { SnackbarComponent } from "./components/Snackbar/SnackbarComponent";


const App = () => {
  return (<>
    <SnackbarComponent />
    <div className="App">
      < Header />
      < Nav />
      < RoutesComponents />
      < Footer />
    </div >
  </>
  );
}

export default App;

