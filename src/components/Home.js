import React from "react"
import { Link, useNavigate } from 'react-router-dom';

export default function  Home (){
    const [quiz, setQuiz] = React.useState(false);
    const navigate = useNavigate();
    function startQuiz(){
        setQuiz(true);
        navigate('/question', { replace: true });
        console.log(quiz);
        return
    }

    console.log(quiz);

    return (
        <main className="home-container">
            <h1 className="quiz-title">Quizzical</h1>
            <p className="quiz-description">If you're ready start the quiz, please click start quiz</p>
            <button className="start-quiz-btn" onClick={startQuiz}>Start Quiz</button>
            {/* <Link to="/question">Question</Link> */}
        </main>
    )
}