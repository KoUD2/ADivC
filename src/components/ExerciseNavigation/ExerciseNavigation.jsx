import React from 'react'

const ExerciseNavigation = ({
  exercises = [],
  currentExerciseIndex = 0,
  onExerciseChange
}) => {
  return (
    <div className="M_ExerciseNavigation">
      <div className="C_ExerciseNavigation">
        {exercises.map((ex, idx) => (
          <button
            key={ex.id}
            className={idx === currentExerciseIndex ? 'is-active' : ''}
            onClick={() => onExerciseChange(idx)}
          >
            {ex.title}
          </button>
        ))}
      </div>
      {exercises[currentExerciseIndex] && (
        <div className="M_ExerciseMeta">
          <h2 className="A_ExerciseTitle">
            {exercises[currentExerciseIndex].title}
          </h2>
          <p className="A_ExerciseDescription">
            {exercises[currentExerciseIndex].description}
          </p>
        </div>
      )}
    </div>
  )
}

export default ExerciseNavigation
