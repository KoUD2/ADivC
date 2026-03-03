import React from 'react'
import QuizSingleChoice from './QuizSingleChoice'
import QuizMultipleChoice from './QuizMultipleChoice'
import CodeBlock from './CodeBlock'
import QuoteBlock from './QuoteBlock'
import LinksBlock from './LinksBlock'
import ImageBlock from './ImageBlock'
import VideoBlock from './VideoBlock'

// Генерация slug из текста заголовка для якорей
const generateSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\wа-яё\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

const ContentRenderer = ({ content }) => {
  let quizCounter = 0
  const result = []
  let quizGroup = []
  let paragraphGroup = []
  let hasHeadingInGroup = false

  const flushQuizGroup = (index) => {
    if (quizGroup.length > 0) {
      result.push(
        <div key={`quiz-group-${index}`} className="SO_TestsContainer">
          {quizGroup}
        </div>
      )
      quizGroup = []
    }
  }

  const flushParagraphGroup = (index) => {
    if (paragraphGroup.length > 0) {
      result.push(
        <div
          key={`paragraph-group-${index}`}
          className="M_Paragraph M_ParagraphArticle"
        >
          {paragraphGroup}
        </div>
      )
      paragraphGroup = []
      hasHeadingInGroup = false
    }
  }

  content.forEach((block, index) => {
    switch (block.type) {
      case 'quiz-single':
        flushParagraphGroup(index)
        quizCounter++
        quizGroup.push(
          <QuizSingleChoice
            key={`quiz-${index}`}
            question={block.question}
            options={block.options}
            number={quizCounter}
          />
        )
        break

      case 'quiz-multiple':
        flushParagraphGroup(index)
        quizCounter++
        quizGroup.push(
          <QuizMultipleChoice
            key={`quiz-${index}`}
            question={block.question}
            options={block.options}
            number={quizCounter}
          />
        )
        break

      case 'heading':
        flushQuizGroup(index)
        flushParagraphGroup(index)
        paragraphGroup.push(
          <h2
            key={`heading-${index}`}
            id={generateSlug(block.text)}
            className="A_Text A_Text--h2"
          >
            {block.text}
          </h2>
        )
        hasHeadingInGroup = true
        break

      case 'paragraph':
        flushQuizGroup(index)
        paragraphGroup.push(
          <p key={`paragraph-${index}`} className="A_Text">
            {block.text}
          </p>
        )
        break

      default:
        flushQuizGroup(index)
        flushParagraphGroup(index)

        switch (block.type) {
          case 'code':
            result.push(
              <CodeBlock
                key={index}
                language={block.language}
                code={block.code}
              />
            )
            break

          case 'quote':
            result.push(
              <QuoteBlock
                key={index}
                title={block.title}
                text={block.text}
                variant={block.variant}
              />
            )
            break

          case 'links':
            result.push(<LinksBlock key={index} links={block.links} />)
            break

          case 'image':
            result.push(
              <ImageBlock
                key={index}
                src={block.src}
                alt={block.alt}
                caption={block.caption}
              />
            )
            break

          case 'video':
            result.push(
              <VideoBlock
                key={index}
                src={block.src}
                embedUrl={block.embedUrl}
                poster={block.poster}
                title={block.title}
              />
            )
            break

          case 'text-block':
            result.push(
              <div key={index} className="O_TextBlock">
                {block.children &&
                  block.children.map((child, childIndex) => {
                    if (child.type === 'heading') {
                      return (
                        <div key={childIndex} className="M_ArticleHeading">
                          <h2
                            id={generateSlug(child.text)}
                            className="A_Text A_Text--h2"
                          >
                            {child.text}
                          </h2>
                        </div>
                      )
                    }
                    if (child.type === 'paragraph') {
                      return (
                        <div
                          key={childIndex}
                          className="M_Paragraph M_ParagraphArticle"
                        >
                          <p className="A_Text">{child.text}</p>
                        </div>
                      )
                    }
                    return null
                  })}
              </div>
            )
            break

          default:
            console.warn(`Unknown content type: ${block.type}`)
        }
    }
  })

  flushQuizGroup(content.length)
  flushParagraphGroup(content.length)

  return <>{result}</>
}

export default ContentRenderer
