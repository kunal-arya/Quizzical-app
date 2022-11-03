import blobDown from "../assets/blob-down.svg"
import blobUp from "../assets/blob-up.svg"

export default function Intro(props) {
    
    return (
        <main className="main">
          <h1 className="main--heading">Quizzical</h1>
          <p className="main--subheading">Answer 5 multiple-choice quiz questions</p>
          <button 
            className="btn-primary big" 
            onClick={props.clickHandler}
            > Start quiz </button>
          <img src={blobDown} className="blob-down"/>
          <img src={blobUp} className="blob-up" />
        </main>
    )
}