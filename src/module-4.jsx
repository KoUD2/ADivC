import React from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import ModulePage from './javascript/components/ModulePage'
import './index.css'
import './javascript/searchModalMount.js'
import './javascript/mobileMenuMount.js'

const container = document.getElementById('root')

if (container.children.length > 0) {
  hydrateRoot(container, <ModulePage moduleSlug="module-4" />)
} else {
  createRoot(container).render(<ModulePage moduleSlug="module-4" />)
}
