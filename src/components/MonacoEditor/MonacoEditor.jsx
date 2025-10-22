import React, { useEffect, useRef, useCallback } from 'react'
import Editor from '@monaco-editor/react'

const MonacoEditor = ({ language, value = '', onChange, formatKey }) => {
  const editorRef = useRef(null)
  const monacoRef = useRef(null)

  const handleMount = useCallback((editor, monaco) => {
    editorRef.current = editor
    monacoRef.current = monaco
    try {
      monaco.editor.setTheme('vs-dark')
      if (
        monaco.languages &&
        monaco.languages.html &&
        monaco.languages.html.htmlDefaults
      ) {
        monaco.languages.html.htmlDefaults.setOptions({
          format: {
            wrapLineLength: 120,
            unformatted: '',
            contentUnformatted: '',
            indentInnerHtml: true,
            preserveNewLines: true
          }
        })
      }
      // форматирование по документу сразу после монтирования
      setTimeout(() => {
        editor.getAction('editor.action.formatDocument')?.run()
      }, 0)
      editor.updateOptions({
        renderIndentGuides: true,
        highlightActiveIndentGuide: true,
        guides: { indentation: true, highlightActiveIndentation: true }
      })
    } catch (_) {}
  }, [])

  useEffect(() => {
    const editor = editorRef.current
    if (!editor) return
    try {
      editor.updateOptions({ tabSize: 2, insertSpaces: true, readOnly: false })
      // форматировать только при смене языка, чтобы не мешать вводу
      editor.getAction('editor.action.formatDocument')?.run()
    } catch (_) {}
  }, [language])

  // форматировать при внешнем триггере (например, смена упражнения)
  useEffect(() => {
    const editor = editorRef.current
    if (!editor) return
    try {
      editor.getAction('editor.action.formatDocument')?.run()
    } catch (_) {}
  }, [formatKey])

  return (
    <div className="M_CodeEditor">
      <Editor
        height="300px"
        language={language}
        value={value}
        onChange={(v) => onChange(v ?? '')}
        onMount={handleMount}
        theme="vs-dark"
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          formatOnType: true,
          formatOnPaste: true,
          automaticLayout: true,
          detectIndentation: false,
          tabSize: 2,
          insertSpaces: true,
          autoIndent: 'full',
          guides: {
            indentation: true,
            highlightActiveIndentation: true,
            bracketPairs: true
          },
          renderIndentGuides: true,
          highlightActiveIndentGuide: true,
          folding: true,
          renderWhitespace: 'boundary',
          renderLineHighlight: 'all'
        }}
      />
    </div>
  )
}

export default MonacoEditor
