
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NoteState from './context/notes/NoteState';

function App() {

  return (
    <>
    <NoteState>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/home" element={<Home/>}>
          </Route>
          <Route exact path="/about" element={<About/>}>
          </Route>
        </Routes>
      </Router>
      </NoteState>
    </>
  );

}

export default App;
