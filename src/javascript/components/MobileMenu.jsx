import React, { useState, useEffect } from 'react'

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      <button
        className="A_SearchButton A_SearchButtonMobile"
        aria-label="Меню"
        onClick={() => setIsOpen(true)}
      >
        <img src="/images/icons/Q_IconMenu.svg" alt="Меню" />
      </button>

      {isOpen && (
        <div
          className="O_MobileMenuOverlay O_MobileMenuOverlay--open"
          onClick={() => setIsOpen(false)}
        >
          <div className="O_MenuOpen" onClick={(e) => e.stopPropagation()}>
            <button
              className="A_CloseButton"
              aria-label="Закрыть меню"
              onClick={() => setIsOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M6.75781 17.2431L12.0004 12.0005M12.0004 12.0005L17.243 6.75781M12.0004 12.0005L6.75781 6.75781M12.0004 12.0005L17.243 17.2431"
                  stroke="#313131"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <nav className="M_MobileMenuNav">
              <a href="/tutorials/index.html" className="A_MobileMenuLink">
                Учебник
              </a>
              <a href="/about.html" className="A_MobileMenuLink">
                О проекте
              </a>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}

export default MobileMenu
