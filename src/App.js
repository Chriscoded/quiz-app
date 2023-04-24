import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Question from './components/Question';
import NotFoundPage from './components/NotFoundPage';

function App() {
  return (
    <div className="App">
      <div className='design-shape-1'>

      </div>
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="question" element={<Question />} />
        <Route path="404" element={<NotFoundPage />} />

        <Route path="*" element={<NotFoundPage replace to="/404" />} />
      </Routes>

      <div className='design-shape-2'>
      </div>
    </div>
  );
}

export default App;
