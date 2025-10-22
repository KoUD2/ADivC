import { useCallback, useState } from 'react'

function parseHTML(code) {
  try {
    const parser = new DOMParser()
    const doc = parser.parseFromString(code, 'text/html')
    return doc
  } catch (_) {
    return null
  }
}

export function useValidation(rules = []) {
  const [results, setResults] = useState([])
  const [isValidating, setIsValidating] = useState(false)

  const validateCode = useCallback(
    async (code, type) => {
      setIsValidating(true)
      try {
        const next = (Array.isArray(rules) ? rules : []).map((rule) => {
          const id = rule.id || 'rule'
          const message = rule.message || id
          let passed = false

          try {
            if (type === 'html') {
              const doc = parseHTML(code)
              if (!doc) {
                passed = false
              } else if (id === 'has-title') {
                const t = doc.querySelector('title')
                passed = !!(
                  t &&
                  t.textContent &&
                  t.textContent.trim().length > 0
                )
              } else if (id === 'has-h1') {
                passed = !!doc.querySelector('h1')
              } else {
                // fallback: check for selector presence if rule has config.selector
                if (rule.config && rule.config.selector) {
                  passed = !!doc.querySelector(rule.config.selector)
                } else {
                  passed = false
                }
              }
            } else if (type === 'css') {
              // simple text-based checks for CSS
              if (id === 'body-color') {
                // look for body { ... color: ... }
                const re = /body\s*{[^}]*color\s*:/i
                passed = re.test(code)
              } else if (rule.config && rule.config.property) {
                const prop = rule.config.property.replace(
                  /[-\\/\\^$*+?.()|[\]{}]/g,
                  '\\$&'
                )
                const re = new RegExp(prop + '\\s*:', 'i')
                passed = re.test(code)
              } else {
                passed = false
              }
            } else if (type === 'javascript') {
              if (id === 'bind-click') {
                // check for addEventListener('click' or .onclick or function handleClick)
                const re1 = /addEventListener\s*\(\s*['"]click['"]/i
                const re2 = /\.onclick\s*=|onClick\s*=/i
                const re3 = /function\s+handleClick\s*\(/i
                passed = re1.test(code) || re2.test(code) || re3.test(code)
              } else {
                passed = false
              }
            } else {
              // unknown type: basic substring check
              passed = code && code.indexOf(id) !== -1
            }
          } catch (e) {
            passed = false
          }

          return { id, passed, message }
        })

        setResults(next)
        return next
      } finally {
        setIsValidating(false)
      }
    },
    [rules]
  )

  return { validateCode, results, isValidating }
}
