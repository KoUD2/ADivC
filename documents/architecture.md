# Архитектура проекта: Интерактивная платформа веб-обучения

## Обзор архитектуры

Проект представляет собой образовательную платформу с интегрированным редактором кода, построенную на базе **static-site-boilerplate** с интеграцией React и Monaco Editor для изучения HTML, CSS и JavaScript.

## Техническая основа

### Сборка и инструменты

- **Webpack 5** - модульная сборка и bundling
- **Babel** - транспиляция ES6+ и JSX
- **PostCSS** - обработка CSS с автопрефиксером
- **React 18** - декларативная UI библиотека
- **Monaco Editor** - профессиональный редактор кода

### Структура проекта

```
static-site-boilerplate/
├── src/
│   ├── index.css                 # Главный файл стилей с архитектурной системой
│   ├── stylesheets/              # Система стилей
│   │   ├── vars.css              # CSS переменные
│   │   ├── components/           # Архитектурные компоненты
│   │   │   ├── quarks.css        # Q_ - примитивные классы
│   │   │   ├── atoms.css         # A_ - атомарные UI элементы
│   │   │   ├── molecules.css    # M_ - композиции атомов
│   │   │   ├── organisms.css    # O_ - функциональные блоки
│   │   │   ├── superorganisms.css # S_ - крупные секции
│   │   │   ├── wrappers.css      # W_ - layout обертки
│   │   │   └── collections.css   # C_ - повторяющиеся группы
│   │   │   # ❌ ЗАПРЕЩЕНО: app.css, main.css, custom.css и другие файлы
│   ├── components/               # React компоненты
│   │   ├── CodeExercise/         # Главный компонент упражнения
│   │   │   └── CodeExercise.jsx
│   │   ├── MonacoEditor/          # React обертка Monaco Editor
│   │   │   └── MonacoEditor.jsx
│   │   ├── CodePreview/          # Предпросмотр кода
│   │   │   └── CodePreview.jsx
│   │   ├── ValidationResults/    # Результаты валидации
│   │   │   └── ValidationResults.jsx
│   │   └── ExerciseNavigation/   # Навигация между упражнениями
│   │       └── ExerciseNavigation.jsx
│   ├── hooks/                    # React хуки
│   │   ├── useValidation.js      # Хук валидации кода
│   │   ├── useDebounce.js        # Хук задержки обновлений
│   │   └── __tests__/            # Тесты хуков
│   │       ├── useValidation.test.js
│   │       └── useDebounce.test.js
│   ├── engine/                   # Система валидации
│   │   ├── ValidationEngine.js   # Основной движок валидации
│   │   ├── ElementValidator.js   # Валидатор HTML элементов
│   │   ├── StyleValidator.js      # Валидатор CSS стилей
│   │   └── BehaviorValidator.js   # Валидатор JavaScript
│   ├── exercises/                # Конфигурации упражнений
│   │   ├── html-basic/
│   │   │   └── exercise.json
│   │   ├── css-styling/
│   │   │   └── exercise.json
│   │   ├── js-interaction/
│   │   │   └── exercise.json
│   │   ├── index.js              # Экспорт всех упражнений
│   │   ├── categories.js         # Категории упражнений
│   │   └── constants.js          # Константы и типы
│   ├── javascript/               # JavaScript модули
│   │   └── App.jsx               # Главное React приложение
│   ├── images/                   # Статические изображения
│   ├── fonts/                    # Шрифты
│   ├── index.js                  # Точка входа главной страницы
│   └── index.css                 # Основные стили
├── docs/                         # Собранные файлы (output)
├── documents/                    # Документация
│   ├── architecture.md           # Архитектура проекта
│   ├── arch-rules.md             # Архитектурные правила
│   └── requirements.md           # Бизнес требования
├── webpack.common.js             # Общая конфигурация Webpack
├── webpack.dev.js                # Конфигурация разработки
├── webpack.prod.js               # Конфигурация продакшена
└── package.json                  # Зависимости и скрипты
```

## Система стилей

### CSS переменные (vars.css)

Единая система переменных для всего проекта.

## React компонентная архитектура

Основные компоненты: `CodeExercise`, `MonacoEditor`, `CodePreview`, `ValidationResults`, `ExerciseNavigation`.

## Система валидации

Центральный движок валидации с поддержкой различных типов проверок: Element/Style/Behavior/Syntax.

## Webpack конфигурация

### Общая конфигурация (webpack.common.js)

- **Entry points**: `index.js`
- **Output**: `docs/` директория, имена файлов с хешами: `[name].[contenthash].js`
- **Loaders**: Babel для JS/JSX, CSS с PostCSS, файлы ресурсов
- **Plugins**: HTML генерация, CSS извлечение
- **Resolve**: Алиасы и fallback для Monaco Editor

#### Оптимизации (Этап 10)

- Включён `splitChunks: { chunks: 'all' }` и `runtimeChunk: 'single'` для разделения кода и лучшего кэширования.
- Добавлены хеши в имена файлов: `filename: '[name].[contenthash].js'`, `chunkFilename: '[name].[contenthash].js'`.
- `MonacoEditor` загружается лениво через `React.lazy` и `Suspense` для уменьшения initial bundle.
- В `package.json` добавлен `browserslist` для корректной работы `autoprefixer` и совместимости.

### Разработка (webpack.dev.js)

- **Mode**: development, HMR через `react-refresh`
- **DevServer**: порт 3000 (возможен запуск на другом порту)

### Продакшен (webpack.prod.js)

- **Mode**: production, минификация CSS, код-сплиттинг

## Принципы архитектуры

- Декларативность, модульность, масштабируемость, производительность, сопровождаемость
