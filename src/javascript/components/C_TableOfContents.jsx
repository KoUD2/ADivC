import React, { useState, useEffect } from 'react'

const C_TableOfContents = ({ content }) => {
  const [activeId, setActiveId] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const headings = content
    .filter((item) => item.type === 'heading')
    .map((heading) => ({
      text: heading.text,
      id: generateSlug(heading.text)
    }))

  function generateSlug(text) {
    return text
      .toLowerCase()
      .replace(/[^\wа-яё\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-100px 0px -66%',
        threshold: 0
      }
    )

    headings.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      headings.forEach(({ id }) => {
        const element = document.getElementById(id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [headings])

  const handleClick = (e, id) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  if (headings.length === 0) return null

  return (
    <nav
      className={`C_TableOfContents ${isOpen ? 'C_TableOfContents--open' : ''}`}
    >
      <div className="O_Content">
        <div
          className="C_TableOfContents__header"
          onClick={() => setIsOpen(!isOpen)}
        >
          <h3 className="C_TableOfContents__title">Содержание</h3>
          <button
            className="C_TableOfContents__toggle"
            aria-label={
              isOpen ? 'Свернуть содержание' : 'Развернуть содержание'
            }
            type="button"
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M6 12H18"
                  stroke="#313131"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M6 12H12M12 12H18M12 12V6M12 12V18"
                  stroke="#313131"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            )}
          </button>
        </div>
        <div className="C_TableOfContents__content">
          <ul className="M_Items">
            {headings.map(({ text, id }) => (
              <li key={id} className="M_Items__item">
                <a
                  href={`#${id}`}
                  onClick={(e) => handleClick(e, id)}
                  className={`C_TableOfContents__link ${
                    activeId === id ? 'C_TableOfContents__link--active' : ''
                  }`}
                  suppressHydrationWarning
                >
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default C_TableOfContents
