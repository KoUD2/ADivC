import React from 'react'
import M_ModuleCard from './M_ModuleCard'
import modulesData from '../../data/modules.json'

const TutorialsPage = () => {
  const { modules } = modulesData

  return (
    <div className="Template_BodyCoursebook">
      {modules.map((module, index) => (
        <React.Fragment key={module.id}>
          <M_ModuleCard module={module} moduleNumber={index + 1} />
          {index < modules.length - 1 && (
            <div className="Q_Line--horizontal"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export default TutorialsPage
