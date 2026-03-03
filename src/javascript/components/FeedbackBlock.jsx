import React, { useState } from 'react'

const FeedbackBlock = ({ title }) => {
  const [feedback, setFeedback] = useState(null)

  const handleFeedback = (value) => {
    setFeedback(value)
    console.log('Feedback:', value)
  }

  return (
    <div className="O_RateCard">
      <h2>Была ли эта статья полезной?</h2>

      {!feedback ? (
        <div className="C_Buttons">
          <button
            className="M_Button M_ButtonHelp"
            onClick={() => handleFeedback('yes')}
          >
            <img src="/images/icons/Q_IconLike.svg" alt="Да" />
            <span className="A_Text A_Text--button">Да</span>
          </button>
          <button
            className="M_Button M_ButtonHelp"
            onClick={() => handleFeedback('no')}
          >
            <img src="/images/icons/Q_IconDislike.svg" alt="Нет" />
            <span className="A_Text A_Text--button">Нет</span>
          </button>
        </div>
      ) : (
        <p className="A_Text">Спасибо за ваш отзыв!</p>
      )}
    </div>
  )
}

export default FeedbackBlock
