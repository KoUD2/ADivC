/**
 * Удаляет общий начальный отступ из многострочного кода
 * @param {string} code - Код для форматирования
 * @returns {string} - Код с удаленными лишними отступами
 */
export const formatCode = (code) => {
  if (!code) return ''

  // Разбиваем код на строки
  const lines = code.split('\n')

  // Удаляем пустые строки в начале и конце
  while (lines.length && !lines[0].trim()) {
    lines.shift()
  }
  while (lines.length && !lines[lines.length - 1].trim()) {
    lines.pop()
  }

  if (lines.length === 0) return ''

  // Находим минимальный отступ среди непустых строк
  const minIndent = lines.reduce((min, line) => {
    if (!line.trim()) return min // Пропускаем пустые строки
    const indent = line.match(/^\s*/)[0].length
    return indent < min ? indent : min
  }, Infinity)

  // Удаляем минимальный отступ из каждой строки
  const formatted = lines.map((line) => {
    if (!line.trim()) return '' // Пустые строки остаются пустыми
    return line.slice(minIndent)
  })

  return formatted.join('\n')
}
