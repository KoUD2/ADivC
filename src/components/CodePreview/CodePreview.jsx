import React, { useMemo } from 'react'

const CodePreview = ({ code, type }) => {
  const content = useMemo(() => {
    if (type === 'html') return code
    if (type === 'css')
      return `<style>${code}</style><h1 class="O_PreviewHeading">Preview Heading</h1>`
    if (type === 'javascript')
      return `<script>try{${code}}catch(e){console.error(e)}</script>`
    return code
  }, [code, type])

  return (
    <iframe
      title="preview"
      className="O_PreviewFrame"
      sandbox="allow-scripts allow-same-origin"
      srcDoc={`<!doctype html><html><head><meta charset='utf-8'/></head><body>${content}</body></html>`}
    />
  )
}

export default CodePreview
