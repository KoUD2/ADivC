import React from 'react'
import { createRoot } from 'react-dom/client'
import D_ArticlePage from './javascript/components/D_ArticlePage'
import { getLessonSlugFromPath, loadLessonData } from './utils/loadLessonData'
import './index.css'
import './javascript/searchModalMount.js'
import './javascript/mobileMenuMount.js'

// Получаем slug урока из URL
const lessonSlug = getLessonSlugFromPath()

// Загружаем данные урока
const lessonData = lessonSlug ? loadLessonData(lessonSlug) : null

const root = createRoot(document.getElementById('root'))
root.render(<D_ArticlePage lessonData={lessonData} />)
