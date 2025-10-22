import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'
import { useDebounce } from '../../hooks/useDebounce'
import { useValidation } from '../../hooks/useValidation'
import CodePreview from '../CodePreview/CodePreview.jsx'
import ValidationResults from '../ValidationResults/ValidationResults.jsx'
const MonacoEditor = lazy(() => import('../MonacoEditor/MonacoEditor.jsx'))

const CodeExercise = ({ config }) => {
  const storageKey = useMemo(() => `exercise:${config.id}:code`, [config.id])
  const completedKey = useMemo(
    () => `exercise:${config.id}:completed`,
    [config.id]
  )

  const [code, setCode] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      return saved !== null ? saved : config.initialCode || ''
    } catch (_) {
      return config.initialCode || ''
    }
  })
  const debouncedCode = useDebounce(code, 500)

  const { validateCode, results, isValidating } = useValidation(
    config.validation
  )

  const handleCodeChange = useCallback((newCode) => {
    setCode(newCode)
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, code || '')
    } catch (_) {}
  }, [code, storageKey])

  const handleValidate = useCallback(async () => {
    await validateCode(code, config.type)
  }, [code, config.type, validateCode])

  useEffect(() => {
    if (!results || !Array.isArray(results)) return
    const isAllPassed = results.every((r) => r && r.passed)
    try {
      localStorage.setItem(completedKey, isAllPassed ? 'true' : 'false')
    } catch (_) {}
  }, [results, completedKey])

  return (
    <div className="S_ExerciseWorkspace">
      <div className="O_ExerciseHeader">
        <h2 className="A_ExerciseTitle">{config.title}</h2>
        <p className="A_ExerciseDescription">{config.description}</p>
      </div>

      <div className="O_ExerciseContent">
        <div className="O_CodeEditor">
          <Suspense
            fallback={
              <div className="A_EditorLoading">Загрузка редактора...</div>
            }
          >
            <MonacoEditor
              language={config.type}
              value={code}
              onChange={handleCodeChange}
            />
          </Suspense>
        </div>

        <div className="O_CodePreview">
          <CodePreview code={debouncedCode} type={config.type} />
        </div>
      </div>

      {results && (
        <div className="O_ValidationPanel">
          <ValidationResults results={results} config={config.validation} />
        </div>
      )}
    </div>
  )
}

export default CodeExercise
