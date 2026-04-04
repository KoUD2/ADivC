import React from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import TutorialsPage from './javascript/components/TutorialsPage'
import './index.css'
import './javascript/searchModalMount.js'
import './javascript/mobileMenuMount.js'

const container = document.getElementById('root')

if (container.children.length > 0) {
  hydrateRoot(container, <TutorialsPage />)
} else {
  createRoot(container).render(<TutorialsPage />)
}
