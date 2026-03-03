// Утилита для загрузки данных урока по slug
export const loadLessonData = (lessonSlug) => {
  try {
    const lessonData = require(`../data/lessons/${lessonSlug}.json`)
    return lessonData
  } catch (error) {
    console.error(`Failed to load lesson: ${lessonSlug}`, error)
    return null
  }
}

// Получить данные урока из URL
export const getLessonSlugFromPath = () => {
  if (typeof window === 'undefined') return null

  const path = window.location.pathname
  const match = path.match(/\/tutorials\/[^/]+\/([^/]+)\.html/)
  return match ? match[1] : null
}
