import React from 'react'

const M_LessonCard = ({ lesson, moduleSlug }) => {
  return (
    <a
      href={`/tutorials/${moduleSlug}/${lesson.slug}.html`}
      className="M_LessonCard"
    >
      <div className="M_LessonCard__number">
        <span className="M_LessonCard__numberText">
          Урок {lesson.lessonNumber}
        </span>
      </div>

      <div className="M_LessonCard__content">
        <h4 className="M_LessonCard__title">{lesson.title}</h4>
        <p className="M_LessonCard__description">{lesson.description}</p>

        <div className="M_LessonCard__footer">
          <span className="M_LessonCard__duration">{lesson.duration} мин</span>
          <span className="M_LessonCard__arrow">→</span>
        </div>
      </div>
    </a>
  )
}

export default M_LessonCard
