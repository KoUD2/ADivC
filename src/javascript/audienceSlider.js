document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.W_AudienceCards')
  const arrowsContainer = document.querySelector('.SO_BannerCenterLanding .M_Arrows')

  if (!container || !arrowsContainer) return

  const prevButton = arrowsContainer.querySelector('.A_ButtonRounded:first-child')
  const nextButton = arrowsContainer.querySelector('.A_ButtonRounded:last-child')

  if (!prevButton || !nextButton) return

  const cards = Array.from(container.children)
  let currentIndex = 0

  const updateSlider = () => {
    const cardWidth = cards[0].offsetWidth
    const gap = parseFloat(getComputedStyle(container).gap) || 0
    const offset = -(currentIndex * (cardWidth + gap))

    // Двигаем каждую карточку внутри контейнера
    cards.forEach((card) => {
      card.style.transform = `translateX(${offset}px)`
      card.style.transition = 'transform 0.3s ease'
    })

    // Обновляем состояние кнопок
    prevButton.disabled = currentIndex === 0
    nextButton.disabled = currentIndex === cards.length - 1
  }

  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--
      updateSlider()
    }
  })

  nextButton.addEventListener('click', () => {
    if (currentIndex < cards.length - 1) {
      currentIndex++
      updateSlider()
    }
  })

  // Инициализация
  updateSlider()

  // Обновление при изменении размера окна
  window.addEventListener('resize', updateSlider)
})
