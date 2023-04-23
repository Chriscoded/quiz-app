import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Question from './components/Question';

function App() {
  return (
    <div className="App">
      <div className='design-shape-1'>

      </div>
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="question" element={<Question />} />
      </Routes>

      <div className='design-shape-2'>
      </div>
    </div>
  );
}

export default App;
