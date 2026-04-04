import React from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import D_ArticlePage from './javascript/components/D_ArticlePage'
import './index.css'
import './javascript/searchModalMount.js'
import './javascript/mobileMenuMount.js'

const container = document.getElementById('articleRoot')

if (container.children.length > 0) {
  hydrateRoot(container, <D_ArticlePage />)
} else {
  createRoot(container).render(<D_ArticlePage />)
}
