import React from 'react'
import { createRoot } from 'react-dom/client'
import SearchModal from './components/SearchModal'

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('search-modal-root')
  if (container) {
    const root = createRoot(container)
    root.render(<SearchModal />)
  }
})
