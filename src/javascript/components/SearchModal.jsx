import React, { useState, useEffect } from 'react'
import modulesData from '../../data/modules.json'

const SearchModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState({ modules: [], lessons: [] })
  const [searchPerformed, setSearchPerformed] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setQuery('')
      setResults({ modules: [], lessons: [] })
      setSearchPerformed(false)
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const highlightText = (text, searchQuery) => {
    if (!searchQuery.trim()) return text

    const regex = new RegExp(`(${searchQuery})`, 'gi')
    const parts = text.split(regex)

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="A_Highlight">
          {part}
        </mark>
      ) : (
        part
      )
    )
  }

  const createSnippet = (text, query) => {
    const lowerText = text.toLowerCase()
    const lowerQuery = query.toLowerCase()
    const index = lowerText.indexOf(lowerQuery)

    if (index === -1) return text

    // Определяем границы фрагмента
    let start = Math.max(0, index - 100)
    let end = Math.min(text.length, index + query.length + 200)

    // Находим начало слова
    if (start > 0) {
      while (start < index && text[start] !== ' ' && text[start] !== '\n') {
        start++
      }
      start = start === index ? Math.max(0, index - 100) : start + 1
    }

    // Находим конец слова
    if (end < text.length) {
      while (
        end > index &&
        text[end] !== ' ' &&
        text[end] !== '\n' &&
        text[end] !== '.' &&
        text[end] !== ','
      ) {
        end++
      }
    }

    let snippet = text.substring(start, end).trim()

    // Добавляем троеточие
    if (start > 0) snippet = '...' + snippet
    if (end < text.length) snippet = snippet + '...'

    return snippet
  }

  const performSearch = (searchQuery) => {
    setSearchPerformed(true)

    if (!searchQuery.trim()) {
      setResults({ modules: [], lessons: [] })
      return
    }

    const lowerQuery = searchQuery.toLowerCase()
    const moduleResults = []
    const lessonResults = []

    modulesData.modules.forEach((module, moduleIndex) => {
      const moduleNumber = moduleIndex + 1
      let found = false
      let descriptionSnippet = ''

      // Поиск в названии модуля
      if (module.title.toLowerCase().includes(lowerQuery)) {
        found = true
      }

      // Поиск в описании модуля
      if (module.description.toLowerCase().includes(lowerQuery)) {
        found = true
        descriptionSnippet = createSnippet(module.description, lowerQuery)
      } else if (found && module.description) {
        // Если найдено в названии, показываем начало описания
        descriptionSnippet =
          module.description.length > 150
            ? module.description.substring(0, 150) + '...'
            : module.description
      }

      if (found) {
        moduleResults.push({
          type: 'module',
          module: module,
          title: module.title,
          moduleNumber: moduleNumber,
          descriptionSnippet: descriptionSnippet,
          url: `/tutorials/${module.slug}/index.html`
        })
      }

      // Поиск в уроках
      module.lessons.forEach((lesson) => {
        let found = false
        let descriptionText = ''

        // Поиск в названии урока
        if (lesson.title.toLowerCase().includes(lowerQuery)) {
          found = true
        }

        // Поиск в описании урока
        if (
          lesson.description &&
          lesson.description.toLowerCase().includes(lowerQuery)
        ) {
          found = true
          descriptionText = createSnippet(lesson.description, lowerQuery)
        } else if (found && lesson.description) {
          // Если найдено в названии, показываем начало описания
          descriptionText =
            lesson.description.length > 150
              ? lesson.description.substring(0, 150) + '...'
              : lesson.description
        }

        // Поиск в содержимом урока
        if (!found) {
          try {
            const lessonData = require(`../../data/lessons/${lesson.slug}.json`)
            if (lessonData.content) {
              for (const block of lessonData.content) {
                let textToSearch = ''

                if (block.type === 'paragraph' && block.text) {
                  textToSearch = block.text
                } else if (block.type === 'heading' && block.text) {
                  textToSearch = block.text
                } else if (block.type === 'code' && block.code) {
                  textToSearch = block.code
                } else if (block.type === 'quote' && block.text) {
                  textToSearch = block.text
                } else if (block.type === 'image' && block.alt) {
                  textToSearch = block.alt
                } else if (block.type === 'links' && block.links) {
                  // Поиск по тексту ссылок
                  textToSearch = block.links.map((link) => link.text).join(' ')
                } else if (
                  (block.type === 'quiz-single' ||
                    block.type === 'quiz-multiple') &&
                  block.question
                ) {
                  // Поиск по вопросу и вариантам ответов
                  const questionText = block.question
                  const optionsText = block.options
                    ? block.options.map((opt) => opt.text).join(' ')
                    : ''
                  textToSearch = questionText + ' ' + optionsText
                }

                if (
                  textToSearch &&
                  textToSearch.toLowerCase().includes(lowerQuery)
                ) {
                  found = true
                  descriptionText = createSnippet(textToSearch, lowerQuery)
                  break
                }
              }
            }
          } catch (error) {
            // Файл урока не найден, пропускаем
          }
        }

        if (found) {
          lessonResults.push({
            type: 'lesson',
            moduleNumber: moduleNumber,
            moduleTitle: module.title,
            lessonTitle: lesson.title,
            description: descriptionText,
            url: `/tutorials/${module.slug}/${lesson.slug}.html`
          })
        }
      })
    })

    // Удаляем дубликаты
    const uniqueModules = Array.from(
      new Set(moduleResults.map((r) => r.url))
    ).map((url) => moduleResults.find((r) => r.url === url))
    const uniqueLessons = Array.from(
      new Set(lessonResults.map((r) => r.url))
    ).map((url) => lessonResults.find((r) => r.url === url))

    setResults({ modules: uniqueModules, lessons: uniqueLessons })
  }

  const handleSearchClick = () => {
    performSearch(query)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      performSearch(query)
    }
  }

  const totalResults = results.modules.length + results.lessons.length

  return (
    <>
      <button
        className="A_SearchButton"
        aria-label="Поиск по сайту"
        onClick={() => setIsOpen(true)}
      >
        <img src="/images/icons/Q_IconSearch.svg" alt="Поиск по сайту" />
      </button>

      {isOpen && (
        <div
          className="O_SearchOverlay O_SearchOverlay--open"
          onClick={() => setIsOpen(false)}
        >
          <div className="O_SearchField" onClick={(e) => e.stopPropagation()}>
            <div className="M_SearchBar">
              <div className="M_SearchText">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M17 17L21 21"
                    stroke="#313131"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M3 11C3 15.4183 6.58172 19 11 19C13.213 19 15.2161 18.1015 16.6644 16.6493C18.1077 15.2022 19 13.2053 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11Z"
                    stroke="#313131"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Найти в учебнике"
                  className="A_SearchInput"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value)
                    setSearchPerformed(false)
                  }}
                  onKeyPress={handleKeyPress}
                  autoFocus
                />
              </div>
              <button className="M_Button--search" onClick={handleSearchClick}>
                Найти
              </button>
            </div>

            {searchPerformed && (
              <div className="W_SearchResults">
                {results.modules.length > 0 && (
                  <div className="O_SearchSection">
                    <h3 className="A_SearchSectionTitle">Модули</h3>
                    {results.modules.map((result, index) => (
                      <a
                        key={`module-${index}`}
                        href={result.url}
                        className="O_SearchResult"
                      >
                        <h4 className="A_SearchResultTitle">
                          {result.moduleNumber} модуль.{' '}
                          {highlightText(result.title, query)}
                        </h4>
                        {result.descriptionSnippet && (
                          <p className="A_SearchResultDescription">
                            {highlightText(result.descriptionSnippet, query)}
                          </p>
                        )}
                      </a>
                    ))}
                  </div>
                )}

                {results.lessons.length > 0 && (
                  <div className="O_SearchSection">
                    <h3 className="A_SearchSectionTitle">Уроки</h3>
                    {results.lessons.map((result, index) => (
                      <a
                        key={`lesson-${index}`}
                        href={result.url}
                        className="O_SearchResult"
                      >
                        <p className="A_SearchModuleTitle">
                          {result.moduleNumber} модуль. {result.moduleTitle}
                        </p>
                        <p className="A_SearchResultTitle A_SearchResultDescription A_SearchResultDescriptionDark">
                          {highlightText(result.lessonTitle, query)}
                        </p>
                        {result.description && (
                          <p className="A_SearchResultDescription">
                            {highlightText(result.description, query)}
                          </p>
                        )}
                      </a>
                    ))}
                  </div>
                )}

                {totalResults === 0 && query && (
                  <div className="O_SearchEmpty">
                    <p>Ой, похоже тут пусто</p>
                    <p>
                      Попробуйте другое слово или загляните на страницу со всеми
                      модулямио
                    </p>
                    <img
                      src="/images/icons/Q_IconEmpty.svg"
                      alt="Пустой результат поиска"
                    />
                  </div>
                )}

                {totalResults > 0 && (
                  <div className="A_SearchCount">
                    {totalResults}{' '}
                    {totalResults === 1
                      ? 'результат'
                      : totalResults < 5
                        ? 'результата'
                        : 'результатов'}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default SearchModal
