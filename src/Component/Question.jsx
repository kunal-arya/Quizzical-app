import parse from 'html-react-parser';

export default function Question(props) {

    // whenever any option is click, we are calling the updateQuestion(),
    // in which we are passing the current question object with "isSelected"
    // set to true of the clicked option
    function handleClick(id) {
        props.updateQuestion({
            ...props.currQues,
            options: props.currQues.options.map(option => ({
                ...option,
                isSelected: option.id === id ? true: false
            }))
        })
    }

    // setting the className of the options
    function optionClassName(option) {
        if(props.checkAnswers) {
            if(option.isSelected && option.correctAns) {
                return "selected correct-ans"
            } else if(option.isSelected) {
                return "selected incorrect-ans"
            } else if(option.correctAns) {
                return "correct-ans"
            }
        } else {
            if(option.isSelected) {
                return "selected"
            }
        }

    }

    // getting the option's JSX elements in which we are using
    // input type:"radio" which we hide using CSS and "label" as a 
    // button shape to click for the users

    // setting name property of the button to current Question' ID
    // so that only one option will be selected among 4 options

    let optionElements = props.currQues.options.map(option => {
        return (
            <div key={option.id} className="answer--container">
                <input 
                    className = "answer--hidden"
                    key={option.id} 
                    type="radio"
                    id = {option.id}
                    value = {option.ans}
                    name = {props.currQues.id}
                    onClick = {() => handleClick(option.id)}
                />
                <label htmlFor={option.id} className={`btn-secondary ${optionClassName(option)}`}>{parse(option.ans)}</label>
            </div>

        )
    })

    return (
        <article key={props.currQues.id} className="ques-wrapper">
            <h3 className="quiz-ques">{parse(props.currQues.ques)}</h3>
            <div className="answers-wrapper">
                {optionElements}
            </div>
        </article>
    )
}