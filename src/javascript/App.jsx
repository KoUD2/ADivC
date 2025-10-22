import React, {
  lazy,
  Suspense,
  useEffect,
  useMemo,
  useState,
  useCallback
} from 'react'
import {
  CodePreview,
  ExerciseNavigation,
  ValidationResults
} from '../components'
import { useValidation } from '../hooks/useValidation'
import { exercises } from '../exercises'

const MonacoEditor = lazy(() =>
  import('../components/MonacoEditor/MonacoEditor.jsx')
)

const App = () => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const currentExercise = exercises[currentExerciseIndex]

  const formatHtmlString = (input) => {
    try {
      const tokens = input
        .replace(/>\s*</g, '><')
        .replace(/></g, '>\n<')
        .split(/\n/)
      let indent = 0
      const lines = tokens.map((line) => {
        const trimmed = line.trim()
        const isClosing = /^<\//.test(trimmed)
        const isSelfClosing = /\/>$/.test(trimmed) || /^<!/.test(trimmed)
        if (isClosing) indent = Math.max(indent - 1, 0)
        const padded = `${'  '.repeat(indent)}${trimmed}`
        if (
          !isClosing &&
          !isSelfClosing &&
          /<[^>]+>/.test(trimmed) &&
          !/^<.*><\/.*>$/.test(trimmed)
        ) {
          indent += 1
        }
        return padded
      })
      return lines.join('\n')
    } catch (_) {
      return input
    }
  }

  // initialize code from exercise initialCode and reset on exercise change
  const [code, setCode] = useState(() =>
    currentExercise.type === 'html'
      ? formatHtmlString(currentExercise.initialCode)
      : currentExercise.initialCode
  )

  useEffect(() => {
    try {
      setCode(
        currentExercise.type === 'html'
          ? formatHtmlString(currentExercise.initialCode)
          : currentExercise.initialCode
      )
    } catch (_) {
      setCode(currentExercise.initialCode)
    }
    // reset editor content when switching exercises
  }, [currentExerciseIndex])

  const progress = useMemo(
    () => ({ done: 0, total: exercises.length, percent: 0 }),
    []
  )

  // validation hook for current exercise
  const { validateCode, results, isValidating } = useValidation(
    currentExercise.validation
  )

  const handleValidate = useCallback(async () => {
    await validateCode(code, currentExercise.type)
  }, [code, currentExercise.type, validateCode])

  return (
    <div className="S_LearningPlatform">
      <header className="O_AppHeader">
        <h1 className="A_Title">ADC WebStart</h1>
        <p className="A_Subtitle">3 упражнения: HTML, CSS, JavaScript</p>
      </header>

      <main className="O_AppMain">
        <div className="O_AppContent">
          <div className="O_ExerciseNavigation">
            <ExerciseNavigation
              exercises={exercises}
              currentExerciseIndex={currentExerciseIndex}
              onExerciseChange={setCurrentExerciseIndex}
            />

            <div className="O_ValidationPanel">
              <ValidationResults
                results={results}
                config={currentExercise.validation}
              />
            </div>
          </div>

          <div className="O_ExerciseContent">
            <div className="O_CodeEditor">
              <Suspense
                fallback={
                  <div className="A_EditorLoading">Загрузка редактора...</div>
                }
              >
                <MonacoEditor
                  language={currentExercise.type}
                  value={code}
                  onChange={setCode}
                  formatKey={`${currentExercise.id}:${currentExerciseIndex}`}
                />
              </Suspense>
              <div className="W_buttonsCheck">
                <button
                  className="A_Button A_ButtonPrimary"
                  onClick={handleValidate}
                  disabled={isValidating}
                >
                  {isValidating ? 'Проверка...' : 'Проверить'}
                </button>
              </div>
            </div>
            <div className="O_CodePreview">
              <CodePreview code={code} type={currentExercise.type} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
