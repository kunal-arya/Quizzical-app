import { useState,useEffect } from 'react'
import Intro from "./Component/Intro"
import Questions from "./Component/Questions"
import { nanoid } from 'nanoid'


import './App.css'

export default function App() {

  // If the Game Started or not
  const[startGame, setStartGame] = useState(false)

  // keeping count of number of times people pressing
  // "Play Again" button to get new sets of questions
  const[gameCount,setGameCount] = useState(0)

  // quizQues stores all the info from the API
  const[quizQues, setQuizQues] = useState([])

  // checkAnswers => check if "Check Answers" button is clicked
  // or not
  const[checkAnswers, setCheckAnswers] = useState(false)

  // isLoading => We get the API data or not
  const[isLoading, setIsLoading] = useState(true)

  // totalScore is to keep count of the score
  const[totalScore, setTotalScore] = useState(0)


  // using useEffect to fetch data whenever "gameCount" State Changed
  useEffect(() => {

    // setting "isLoading" state to true, means we are currently in process
    // of fetching data
    setIsLoading(true)

    // fetching data from the api and storing it in the "quizQues" state
    async function dataFetch() {
        const res = await fetch("https://opentdb.com/api.php?amount=5&type=multiple")
        const data = await res.json()
        setQuizQues(arr => {
            for(let i = 0; i < data.results.length; i++) {
              
              // Generating a random index for correct answer
              let correctIdx = Math.floor(Math.random() * 4)

              // created an array to store all the options
              let optionsArr = []
            
              let k = 0 // wrong option index

              // filling the options array with 4 options
              for (let j = 0; j < 4; j++) {
                let ans = ""
                let correct_answer = false
                  if(j === correctIdx) {
                      ans = data.results[i].correct_answer
                      correct_answer = true
                  } else {
                      ans = data.results[i].incorrect_answers[k]
                      k++
                  }

                  // storing every option as an object with 4 properties
                  optionsArr[j] = {
                    id: nanoid(), 
                    ans: ans, 
                    correctAns: correct_answer,
                    isSelected: false
                  }
              }

              // storing the question and options Array as an object
              arr[i] = {
                id: nanoid(),
                ques: data.results[i].question,
                options: optionsArr
              }
          }
            return arr
        })

        // setting "isLoading" state to false, means we have fetched the 
        // data from the API
        setIsLoading(false)
    }

    // calling dataFetch() function
    dataFetch()

  },[gameCount])

  // updating the question
  function updateQues(question) {
    setQuizQues(arr => arr.map(ques => ques.id === question.id ? question : ques))
  }

  // "Check Answers" Button ClickHandler
  function checkAnswersBtnClickHandler() {
    setCheckAnswers(true)
  }

  // "Play Again" Button ClickHandler
  function playAgainBtnClickHandler() {

    // reseting all the values
    setStartGame(false)
    setCheckAnswers(false)
    setQuizQues([])
    setTotalScore(0)
    
    // increasing the count so that we can fetch new 
    // question set
    setGameCount(prevCount => prevCount + 1)
  }


  // storing score to "totalScore" state whenever "checkAnswers" state changed
  useEffect(() => {
    let score = 0

    // looping through the questions and if any option have both true "option.correctAns" and
    // "option.isSelected" , then increasing the count of score by 1
    for(let i = 0; i < quizQues.length; i++) {
      let options = quizQues[i].options
      score += options.some(option => option.correctAns && option.isSelected) ? 1 : 0
    }

    // changing the state of "totalScore"
    setTotalScore(score)
    
  },[checkAnswers])


  // if "startGame" is true, loading the set of questions, otherwise loading the "Intro" component
  return (
    <div className="App">
      {startGame ? 
        <Questions 
          isLoading = {isLoading}
          startGame = {startGame} 
          quizQues = {quizQues}
          updateQues = {updateQues}
          clickHandler = {checkAnswersBtnClickHandler}
          playAgain = {playAgainBtnClickHandler}
          checkAnswers = {checkAnswers}
          totalScore = {totalScore}
        /> :
        <Intro 
          clickHandler = {() => setStartGame(true)} 
        />
      }
    </div>
  )
}
