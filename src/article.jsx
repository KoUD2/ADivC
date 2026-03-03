import React from 'react'
import { createRoot } from 'react-dom/client'
import D_ArticlePage from './javascript/components/D_ArticlePage'
import './index.css'
import './javascript/searchModalMount.js'
import './javascript/mobileMenuMount.js'

const container = document.getElementById('articleRoot')
const root = createRoot(container)

root.render(<D_ArticlePage />)
