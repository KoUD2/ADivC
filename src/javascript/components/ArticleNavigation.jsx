import React from 'react'

const ArticleNavigation = ({ prevArticle, nextArticle }) => {
  return (
    <div className="C_ArrowsGroup">
      {prevArticle ? (
        <a
          href={prevArticle.url}
          className="M_ArrowsLessons M_ArrowsLessons--prev"
          style={{ textDecoration: 'none' }}
        >
          <button className="A_ArrowButton A_ArrowButtonArticle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M21 12H3M3 12L11.5 3.5M3 12L11.5 20.5"
                stroke="#313131"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <span className="A_Text">{prevArticle.title}</span>
        </a>
      ) : (
        <div />
      )}

      {nextArticle ? (
        <a
          href={nextArticle.url}
          className="M_ArrowsLessons M_ArrowsLessons--next"
          style={{ textDecoration: 'none' }}
        >
          <span className="A_Text">{nextArticle.title}</span>
          <button className="A_ArrowButton A_ArrowButtonArticle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M3 12H21M21 12L12.5 3.5M21 12L12.5 20.5"
                stroke="#313131"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </a>
      ) : (
        <div />
      )}
    </div>
  )
}

export default ArticleNavigation
