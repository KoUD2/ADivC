import React from 'react'

const ImageBlock = ({ src, alt = '', caption }) => {
  // Обработка путей к изображениям
  let imageSrc = src

  try {
    // Если путь начинается с ../, пытаемся импортировать через require
    if (src && src.includes('../')) {
      // Извлекаем имя файла
      const fileName = src.split('/').pop()
      // Используем require для импорта из src/images
      imageSrc = require(`../../images/${fileName}`)
    }
  } catch (error) {
    console.error('Failed to load image:', src, error)
  }

  return (
    <div className="O_ImageBlock">
      <img src={imageSrc} alt={alt} className="A_Image" />
      {caption && <p className="A_Text A_Text--caption">{caption}</p>}
    </div>
  )
}

export default ImageBlock
