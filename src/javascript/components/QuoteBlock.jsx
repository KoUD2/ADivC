import React from 'react'

const QuoteBlock = ({ title, text, variant = 'important' }) => {
  return (
    <div className="O_Quote">
      <div className="M_QuoteText">
        <p className="A_Text A_Text--blue">{title}</p>
        <p className="A_Text">{text}</p>
      </div>
    </div>
  )
}

export default QuoteBlock
