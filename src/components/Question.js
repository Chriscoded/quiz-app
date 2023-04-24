import React from "react";
import { useLocation, Route, useNavigate } from 'react-router-dom';
import { nanoid } from "nanoid";
// import { Route } from "react-router-dom";

export default function  Question (props){
    const location = useLocation();
    const navigate = useNavigate();

    const [questions, setQuestion] = React.useState([])
    const [marks, setMarks] = React.useState(0)
    const [countSubmitted, setCountSubmitted] = React.useState(0)

    //the data here will be an object since an object was
    const data = location.state;
    // localStorage.clear("quiz");
    //console.log("from question" + JSON.parse(localStorage.getItem("quiz")));

    var amount = 5;

    // React.useEffect(() => {
    //     fetch(`https://opentdb.com/api.php?amount=${amount}`)
    //     .then(res => res.json())
    //     .then(data => setQuestion(data.results))

        
    // }, [questions]);
      
    //lets add id to each questions
    function addId(){
        setQuestion(oldQuestion => oldQuestion.map(question => {
            return {...question, id : nanoid(), answered : false} 
          }))

        //   console.log(question);
        
            // question.push(id => nanoid())
            // console.log()
    }
    React.useEffect( () => {
        async function fetchQuestions(){
            const res = await fetch(`https://opentdb.com/api.php?amount=${amount}`)
            const data = await res.json()
            setQuestion(data.results)
            //add id to each question
            addId();
            //console.log(data.results);
        }
        fetchQuestions()

        //Clean up side effects in this function
        return function(){
            console.log("Clean up side effects here")
        }

    }, [])
    
    console.log(questions);

    React.useEffect(() => {
        if (data === null || data.quiz !== true ) {
            navigate("/");
        }

        }, []);

    function checkAnswer(event,id,answer){
        event.preventDefault()
        for(var i = 0; i < 5; i++){
            var correctAnswer = questions[i].id === id ? questions[i].correct_answer: null
            
            if(correctAnswer == answer ){
                setMarks(oldMarks => {
                    return oldMarks + 1;
                })
            }

            setQuestion(oldQuestion => oldQuestion.map(question => {
                // return {...question, answered : true} 

                //let signify that this question has been answered, choosen option if right or wrong

                return question.id === id ? {...question, answered : true, selectedOption: answer, correct : question.correct_answer == answer? true: false }  : question
              }))
        }

        //set submission count

        setCountSubmitted( oldcount => oldcount + 1);
       
    }

    if(data !== null && data.quiz === true){
        var count = 0;
        var questionOptions = []
        var qOptions;
       const questionElement =  questions.map( (question) =>  (
             questionOptions = [],
             qOptions ="",
             

            //getting the incorrect answers and correct answers to one array, creating options with it
            question.incorrect_answers.forEach((options, index) => {
                questionOptions.push(options) 
            }),
            //push correct answer to the array
            questionOptions.push(question.correct_answer),
            // questionOptions.push({id : question.id}),

            //shuffle the options
            questionOptions.sort(),
            // console.log(questionOptions),

            qOptions = questionOptions.map((optionDisplay, index) => {
                return <button  
                    key = {optionDisplay.id} 
                         
                    className={`question-option 
                        ${ optionDisplay === question.selectedOption && countSubmitted === 5 ?  (question.correct ===  true) ? "correct": "incorrect" : ""}`} 

                    onClick = {(event) => checkAnswer(event,question.id,optionDisplay )}
                    disabled={question.answered ?true : false}
                    >
                        {optionDisplay}
                    </button>
            }),

            // console.log(qOptions),

           

        <div key="">
            <h1 className="question">
                {question.question}
            </h1>

            <div className="question-option-container">
                {qOptions
                }

            </div>
        </div>

        // {count = count + 1}
            )
         )
        return (
            <main className="question-container">
              {questionElement}
              <div class ="result">{countSubmitted === 5 && <p> You scored {marks} / 5 </p>}</div>
            </main>
        )  
    }
    
    
         
}