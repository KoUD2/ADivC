import React from 'react'
import ArticleNavigation from './ArticleNavigation'
import ArticleHero from './ArticleHero'
import ContentRenderer from './ContentRenderer'
import FeedbackBlock from './FeedbackBlock'
import C_TableOfContents from './C_TableOfContents'
import Breadcrumbs from './Breadcrumbs'

const D_ArticlePage = ({ lessonData }) => {
  // Если нет данных, показываем заглушку
  if (!lessonData) {
    return <div>Урок не найден</div>
  }

  // Формируем данные для hero из lesson data
  const articleData = {
    hero: {
      title: lessonData.title,
      titleWords: lessonData.title.split(' '),
      lessonNumber: lessonData.hero.lessonNumber,
      totalLessons: lessonData.hero.totalLessons,
      duration: lessonData.hero.duration
    },
    content: lessonData.content,
    navigation: lessonData.navigation
  }

  return (
    <div className="D_ArticlePage">
      <Breadcrumbs
        moduleTitle={lessonData.moduleTitle}
        moduleSlug={lessonData.moduleSlug}
        lessonTitle={lessonData.title}
      />

      <ArticleHero
        title={articleData.hero.title}
        titleWords={articleData.hero.titleWords}
        lessonNumber={articleData.hero.lessonNumber}
        totalLessons={articleData.hero.totalLessons}
        duration={articleData.hero.duration}
      />

      <div className="SO_ArticlePage__container">
        <aside className="D_ArticlePage__sidebar">
          <C_TableOfContents content={articleData.content} />
        </aside>

        <main className="SO_ArticlePage__main">
          <ContentRenderer content={articleData.content} />

          <FeedbackBlock />

          <ArticleNavigation
            prevArticle={articleData.navigation.prev}
            nextArticle={articleData.navigation.next}
          />
        </main>
      </div>
    </div>
  )
}

export default D_ArticlePage
