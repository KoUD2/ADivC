import React from 'react'

const ArticleHero = ({ title, lessonNumber, totalLessons, duration }) => {
  return (
    <section className="SO_BannerArticle">
      <svg
        className="SO_BannerArticle__pattern"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 4934.213 1414.214"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="diagonalStripes"
            patternUnits="userSpaceOnUse"
            width="14"
            height="14"
            patternTransform="rotate(45)"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="14"
              stroke="#A7A6FF"
              strokeWidth="7"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diagonalStripes)" />
      </svg>

      <div className="SO_BannerArticle__contentWrapper">
        <div className="SO_BannerArticle__content">
          <h1 className="A_Text A_Text--h1">{title}</h1>
        </div>

        <div className="SO_BannerArticle__numbers">
          <div className="C_Numbers">
            <div className="W_Number">
              <div className="W_Number__underlay">
                <span className="M_Underlay M_Underlay--accent A_Text A_Text--h1">
                  {`${lessonNumber}/${totalLessons}`}
                </span>
              </div>
              <div className="W_Number__underlay-green">
                <span className="A_Text">урок</span>
              </div>
            </div>
            <div className="W_Number">
              <div className="W_Number__underlay">
                <span className="M_Underlay M_Underlay--accent A_Text A_Text--h1">
                  {duration}
                </span>
              </div>
              <div className="W_Number__underlay-green">
                <span className="A_Text">минут</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ArticleHero
