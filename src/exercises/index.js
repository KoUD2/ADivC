export const exercises = [
  {
    id: 'html-basic',
    title: 'HTML: Базовая структура',
    description:
      'Задача: добавьте корректный заголовок страницы (<title>) и главный заголовок <h1> с текстом; убедитесь, что структура <!doctype>, <html>, <head>, <body> присутствует.',
    type: 'html',
    initialCode: `<!doctype html>
<html>
  <head>
    <title>Title</title>
  </head>
  <body>
    <h1>Hello</h1>
  </body>
</html>`,
    validation: [
      {
        id: 'has-title',
        message: 'Есть <title>',
        validate: (code) => {
          try {
            const parser = new DOMParser()
            const doc = parser.parseFromString(code, 'text/html')
            const t = doc.querySelector('title')
            return !!(t && t.textContent && t.textContent.trim().length > 0)
          } catch (_) {
            return false
          }
        }
      },
      {
        id: 'has-h1',
        message: 'Есть <h1>',
        validate: (code) => {
          try {
            const parser = new DOMParser()
            const doc = parser.parseFromString(code, 'text/html')
            return !!doc.querySelector('h1')
          } catch (_) {
            return false
          }
        }
      }
    ]
  },
  {
    id: 'css-styling',
    title: 'CSS: Стилизация',
    description:
      'Задача: задайте цвет текста для <body> и добавьте стили для <h1> (цвет, размер шрифта и отступы).',
    type: 'css',
    initialCode: `/* Стилизуйте элементы на странице */
h1 {
  color: #111999;
}`,
    validation: [
      {
        id: 'body-color',
        message: 'Цвет текста задан',
        validate: (code) => {
          try {
            const re = /body\s*{[^}]*color\s*:/i
            return re.test(code)
          } catch (_) {
            return false
          }
        }
      }
    ]
  },
  {
    id: 'js-interaction',
    title: 'JavaScript: Взаимодействие',
    description:
      'Задача: добавьте обработчик клика по кнопке, который изменяет текст на странице и/или изменяет стиль элемента (не используйте alert для проверки).',
    type: 'javascript',
    initialCode: `// Добавьте обработчик клика
document.body.innerHTML = '<button id="btn">Click</button>';
document.getElementById('btn').addEventListener('click', () => {
  alert('clicked');
});`,
    validation: [
      {
        id: 'bind-click',
        message: 'Клик обрабатывается',
        validate: (code) => {
          try {
            const re1 = /addEventListener\s*\(\s*['\"]click['\"]/i
            const re2 = /\.onclick\s*=|onClick\s*=/i
            const re3 = /function\s+handleClick\s*\(/i
            return re1.test(code) || re2.test(code) || re3.test(code)
          } catch (_) {
            return false
          }
        }
      }
    ]
  }
]
