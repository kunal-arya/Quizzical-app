import { useState,useEffect } from 'react'
import Intro from "./Component/Intro"
import './App.css'

export default function App() {

  const[startGame, setStartGame] = useState(false)

  return (
    <Intro 
      clickHandler = {() => setStartGame(true)}
    />
  )
}
