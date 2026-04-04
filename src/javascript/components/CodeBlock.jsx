import React, { useState } from 'react'
import Prism from 'prismjs'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-javascript'
import { formatCode } from '../../utils/formatCode'

const CodeBlock = ({ code, language = 'html' }) => {
  const [copied, setCopied] = useState(false)
  const formattedCode = formatCode(code)

  const langMap = {
    html: 'markup',
    xml: 'markup',
    svg: 'markup'
  }

  const prismLang = langMap[language] || language
  const grammar = Prism.languages[prismLang] || Prism.languages.markup
  const highlightedCode = Prism.highlight(formattedCode, grammar, prismLang)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formattedCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="SO_CodeSection">
      <div className="O_CodeBlock">
        <div className="M_CodeTop">
          <span className="A_Text A_Text--grey A_Text--code">
            {language.toUpperCase()}
          </span>
          <div className="C_CodeButtons">
            <button className="M_CodeButton" onClick={handleCopy}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M20 9H11C9.89543 9 9 9.89543 9 11V20C9 21.1046 9.89543 22 11 22H20C21.1046 22 22 21.1046 22 20V11C22 9.89543 21.1046 9 20 9Z"
                  stroke="#313131"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 15H4C3.46957 15 2.96086 14.7893 2.58579 14.4142C2.21071 14.0391 2 13.5304 2 13V4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H13C13.5304 2 14.0391 2.21071 14.4142 2.58579C14.7893 2.96086 15 3.46957 15 4V5"
                  stroke="#313131"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="A_Text A_Text--button">
                {copied ? 'Скопировано' : 'Копировать'}
              </span>
            </button>
          </div>
        </div>

        <pre>
          <code
            className={`language-${prismLang}`}
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        </pre>
      </div>
    </div>
  )
}

export default CodeBlock
