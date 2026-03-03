import React from 'react'
import { createRoot } from 'react-dom/client'
import TutorialsPage from './javascript/components/TutorialsPage'
import './index.css'
import './javascript/searchModalMount.js'
import './javascript/mobileMenuMount.js'

const root = createRoot(document.getElementById('root'))
root.render(<TutorialsPage />)
