import React from 'react'

const Breadcrumbs = ({ moduleTitle, moduleSlug, lessonTitle }) => {
  return (
    <div className="A_Breadcrumbs">
      <p className="A_NavigationLink">
        <a href="/">Главная /</a> <a href="/tutorials">Учебник /</a>{' '}
        <a href={`/tutorials/${moduleSlug}`}>{moduleTitle}</a> / {lessonTitle}
      </p>
    </div>
  )
}

export default Breadcrumbs
