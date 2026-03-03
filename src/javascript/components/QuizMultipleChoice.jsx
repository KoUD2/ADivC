import React, { useState } from 'react'
import M_QuizOption from './M_QuizOption'

const QuizMultipleChoice = ({ question, options, number }) => {
  const [selectedOptions, setSelectedOptions] = useState([])
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleOptionClick = (optionId) => {
    if (!isSubmitted) {
      if (selectedOptions.includes(optionId)) {
        setSelectedOptions(selectedOptions.filter((id) => id !== optionId))
      } else {
        setSelectedOptions([...selectedOptions, optionId])
      }
    }
  }

  const handleSubmit = () => {
    if (selectedOptions.length > 0) {
      setIsSubmitted(true)
    }
  }

  const handleReset = () => {
    setSelectedOptions([])
    setIsSubmitted(false)
  }

  const getOptionState = (option) => {
    const isSelected = selectedOptions.includes(option.id)

    if (!isSubmitted) {
      return isSelected ? 'selected' : 'default'
    }

    if (option.correct && isSelected) {
      return 'right_selected'
    }

    if (!option.correct && isSelected) {
      return 'error'
    }

    if (option.correct && !isSelected) {
      return 'right'
    }

    return 'default'
  }

  return (
    <>
      <div className="O_TestBlock">
        <p className="A_Text A_Text--h2">{question}</p>

        <div className="C_TestVariants">
          {options.map((option) => (
            <M_QuizOption
              key={option.id}
              type="checkbox"
              state={getOptionState(option)}
              text={option.text}
              onClick={() => handleOptionClick(option.id)}
              isSubmitted={isSubmitted}
            />
          ))}
        </div>
      </div>

      {!isSubmitted ? (
        <button
          className="M_Button M_Button--quize"
          onClick={handleSubmit}
          disabled={selectedOptions.length === 0}
        >
          <span className="A_Text A_TextWhite A_Text--button">Проверить</span>
        </button>
      ) : (
        <button
          className="M_Button M_Button--quize M_Button--reset"
          onClick={handleReset}
        >
          <img src="/images/icons/Q_IconRevert.svg"></img>
          <span className="A_Text A_Text--button">Пройти заново</span>
        </button>
      )}
    </>
  )
}

export default QuizMultipleChoice
