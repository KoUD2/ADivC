import React from 'react'

const VideoBlock = ({ src, embedUrl, poster, title = 'Видео' }) => {
  // Автоматически конвертируем Kinescope ссылки в embed формат
  let finalEmbedUrl = embedUrl

  if (!finalEmbedUrl && src) {
    // Проверяем, является ли ссылка Kinescope
    const kinescopeMatch = src.match(/kinescope\.io\/([^\/\?]+)/)
    if (kinescopeMatch) {
      const videoId = kinescopeMatch[1]
      finalEmbedUrl = `https://kinescope.io/embed/${videoId}`
    }
  }

  if (finalEmbedUrl) {
    return (
      <div className="O_VideoBlock">
        <iframe
          src={finalEmbedUrl}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="A_VideoEmbed"
        />
      </div>
    )
  }

  return (
    <div className="O_VideoBlock">
      <video controls poster={poster} className="A_Video">
        <source src={src} type="video/mp4" />
        Ваш браузер не поддерживает видео.
      </video>
    </div>
  )
}

export default VideoBlock
