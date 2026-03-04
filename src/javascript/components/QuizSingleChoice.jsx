import React, { useState, useMemo } from 'react'
import M_QuizOption from './M_QuizOption'

const QuizSingleChoice = ({ question, options, number }) => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Генерируем уникальные ID для опций
  const optionsWithIds = useMemo(
    () =>
      options.map((option, index) => ({
        ...option,
        id: `quiz-${number}-option-${index}`
      })),
    [options, number]
  )

  const handleOptionClick = (optionId) => {
    if (!isSubmitted) {
      setSelectedOption(optionId)
      setIsSubmitted(true)
    }
  }

  const getOptionState = (option) => {
    const isSelected = selectedOption === option.id

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
    <div className="O_TestBlock">
      <p className="A_Text A_Text--h2">{question}</p>

      <div className="C_TestVariants">
        {optionsWithIds.map((option) => (
          <M_QuizOption
            key={option.id}
            type="radiobutton"
            state={getOptionState(option)}
            text={option.text}
            onClick={() => handleOptionClick(option.id)}
            isSubmitted={isSubmitted}
          />
        ))}
      </div>
    </div>
  )
}

export default QuizSingleChoice
