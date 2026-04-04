import React, { useState } from 'react'

const M_ModuleCard = ({ module, moduleNumber }) => {
  const [expanded, setExpanded] = useState(false)
  const visibleCount = 2
  const lessons = module.lessons || []
  const hiddenCount = Math.max(0, lessons.length - visibleCount)
  const visibleLessons = expanded ? lessons : lessons.slice(0, visibleCount)

  return (
    <div className="SO_Module">
      <div className="W_TextbookLeft">
        <div className="W_NumberModule">
          <div className="M_Underlay-blue">
            <h2>{`${moduleNumber} модуль`}</h2>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="9"
            viewBox="0 0 14 9"
            fill="none"
          >
            <path
              d="M6.9282 8.25L0 0L13.8564 1.21137e-06L6.9282 8.25Z"
              fill="#CCE8FF"
            />
          </svg>
        </div>

        <h2>{module.title}</h2>
        <p className="A_ModuleCardDescription">{module.description}</p>
      </div>

      <div className="O_LessonsModule">
        <div>
          {visibleLessons.map((lesson, index) => (
            <a
              key={lesson.id}
              href={`/tutorials/${module.slug}/${lesson.slug}.html`}
              className="O_Lesson"
            >
              <div className="W_LessonItem">
                <h3 className="M_Underlay M_Underlay--fit">{index + 1}</h3>
                <h3 className="M_LessonTitle">{lesson.title}</h3>
                <div className="A_Time">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 6V12H18"
                      stroke="#999999"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      stroke="#999999"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="A_LessonDuration">{`${lesson.duration} минут`}</p>
                </div>
              </div>
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
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          ))}

          {hiddenCount > 0 && (
            <button
              className="A_MoreModules"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? (
                <>
                  {'Свернуть'}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M18 15L12 9L6 15"
                      stroke="#8D7CFF"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </>
              ) : (
                <>
                  {`+${hiddenCount} ${hiddenCount === 1 ? 'тема' : hiddenCount < 5 ? 'темы' : 'тем'}`}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M6 9L12 15L18 9"
                      stroke="#8D7CFF"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </>
              )}
            </button>
          )}
        </div>

        <a href={`/tutorials/${module.slug}/index.html`} className="M_Button">
          Перейти к модулю
        </a>
      </div>
    </div>
  )
}

export default M_ModuleCard
