import Question from "./Question";
import blobDown from "../assets/blob-down-quiz.svg"
import blobUp from "../assets/blob-up-quiz.svg"
import {ThreeDots} from 'react-loader-spinner'

export default function Questions(props) {

    // if --"isLoading" state is true, that means data is still fetching
    // from the API, till then we are showing animated Three dots
    // else -- showing the questions that are fetched from the data

    // if -- "checkAnswer" state is false, showing a "Check Answer" Button
    // else -- showing the "totalScore" and "Play Again" Button
    
    return (
        <main className="main">

            {props.isLoading ?
                 <ThreeDots 
                    color="#293264" 
                    ariaLabel="three-dots-loading" 
                 />  :
                 <div className="allQues-container">
                    {props.quizQues.map(question => (<Question 
                        key = {question.id} 
                        currQues = {question} 
                        updateQuestion = {props.updateQues} 
                        checkAnswers = {props.checkAnswers}
                    />))}
                </div>
            }
            
            {props.checkAnswers ?
                <div className="play-again">
                    <p className="scoreboard">You have scored {props.totalScore}/5 correct answers</p>
                    <button 
                        className="btn-primary regular"
                        onClick={props.playAgain}
                    >Play Again</button>
                </div> :
                <button 
                    className="btn-primary regular"
                    onClick={props.clickHandler}
                >Check Answers</button>
            }

            <img src={blobDown} alt="blob" className="blob-down" />
            <img src={blobUp} alt="" className="blob-up"/>
        </main>
    )
}