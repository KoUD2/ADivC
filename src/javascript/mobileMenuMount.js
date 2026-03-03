import React from 'react'
import { createRoot } from 'react-dom/client'
import MobileMenu from './components/MobileMenu'

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('mobile-menu-root')
  if (container) {
    const root = createRoot(container)
    root.render(<MobileMenu />)
  }
})
