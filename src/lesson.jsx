import React from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import D_ArticlePage from './javascript/components/D_ArticlePage'
import { getLessonSlugFromPath, loadLessonData } from './utils/loadLessonData'
import './index.css'
import './javascript/searchModalMount.js'
import './javascript/mobileMenuMount.js'

// Получаем slug урока из URL
const lessonSlug = getLessonSlugFromPath()

// Загружаем данные урока
const lessonData = lessonSlug ? loadLessonData(lessonSlug) : null

const container = document.getElementById('root')

if (container.children.length > 0) {
  hydrateRoot(container, <D_ArticlePage lessonData={lessonData} />)
} else {
  createRoot(container).render(<D_ArticlePage lessonData={lessonData} />)
}
