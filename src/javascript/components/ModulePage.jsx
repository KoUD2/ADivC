import React from 'react'
import modulesData from '../../data/modules.json'

const ModulePage = ({ moduleSlug }) => {
  const { modules } = modulesData
  const module = modules.find((m) => m.slug === moduleSlug)

  if (!module) {
    return <div>Модуль не найден</div>
  }

  const moduleNumber = modules.findIndex((m) => m.slug === moduleSlug) + 1
  const lessons = module.lessons || []
  const lessonsCount = lessons.length
  const totalDuration = lessons.reduce(
    (sum, lesson) => sum + lesson.duration,
    0
  )

  const getLessonsLabel = (count) => {
    if (count % 10 === 1 && count % 100 !== 11) return 'урок'
    if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100))
      return 'урока'
    return 'уроков'
  }

  const getMinutesLabel = (count) => {
    if (count % 10 === 1 && count % 100 !== 11) return 'минута'
    if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100))
      return 'минуты'
    return 'минут'
  }

  return (
    <div className="SO_ModuleOne">
      <div className="O_Numbers">
        <div className="A_GridLineModule">
          <div className="W_Number W_NumberLesson">
            <div className="M_Underlay--accent">{lessonsCount}</div>
            <div className="M_Underlay M_UnderlayLesson">
              {getLessonsLabel(lessonsCount)}
            </div>
          </div>

          <div className="W_Number W_NumberTime">
            <div className="M_Underlay--accent">{totalDuration}</div>
            <div className="M_Underlay M_UnderlayLesson">
              {getMinutesLabel(totalDuration)}
            </div>
          </div>
        </div>
      </div>

      <div className="O_LessonsModule O_LessonsModuleList">
        {lessons.map((lesson, index) => (
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
      </div>
    </div>
  )
}

export default ModulePage
