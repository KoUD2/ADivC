import React from 'react'
import { createRoot } from 'react-dom/client'
import ModulePage from './javascript/components/ModulePage'
import './index.css'
import './javascript/searchModalMount.js'
import './javascript/mobileMenuMount.js'

const root = createRoot(document.getElementById('root'))
root.render(<ModulePage moduleSlug="module-4" />)
