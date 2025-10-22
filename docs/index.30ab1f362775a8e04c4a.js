"use strict";
(self["webpackChunkstatic_site_boilerplate"] = self["webpackChunkstatic_site_boilerplate"] || []).push([[57],{

/***/ 286:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(540);
/* harmony import */ var _monaco_editor_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(188);


const MonacoEditor = ({
  language = 'html',
  initialCode = '',
  onChange,
  height = '400px',
  theme = 'vs-dark'
}) => {
  const editorRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const monacoRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const [isEditorReady, setIsEditorReady] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const defaultOptions = {
    fontSize: 14,
    minimap: {
      enabled: false
    },
    scrollBeyondLastLine: false,
    automaticLayout: true,
    wordWrap: 'on',
    lineNumbers: 'on',
    folding: true,
    selectOnLineNumbers: true,
    renderWhitespace: 'selection',
    contextmenu: true,
    mouseWheelZoom: true,
    smoothScrolling: true,
    cursorBlinking: 'blink',
    cursorSmoothCaretAnimation: true,
    renderLineHighlight: 'line',
    bracketPairColorization: {
      enabled: true
    },
    guides: {
      bracketPairs: true,
      indentation: true
    }
  };
  const handleEditorChange = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(value => {
    if (onChange) {
      onChange(value || '');
    }
  }, [onChange]);
  const handleEditorDidMount = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    try {
      setupLanguageServices(monaco, language);
      setIsEditorReady(true);
    } catch (error) {
      console.error('Monaco Editor setup error:', error);
    }
  }, [language]);
  const setupLanguageServices = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((monaco, lang) => {
    switch (lang) {
      case 'html':
        monaco.languages.html.htmlDefaults.setOptions({
          format: {
            insertSpaces: true,
            tabSize: 2,
            wrapLineLength: 120,
            unformatted: '',
            indentInnerHtml: false
          },
          validate: true,
          suggest: {
            html5: true
          }
        });
        break;
      case 'css':
        monaco.languages.css.cssDefaults.setOptions({
          validate: true,
          format: {
            insertSpaces: true,
            tabSize: 2
          }
        });
        break;
      case 'javascript':
        monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
          target: monaco.languages.typescript.ScriptTarget.ES2020,
          allowNonTsExtensions: true,
          moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
          module: monaco.languages.typescript.ModuleKind.CommonJS,
          noEmit: true,
          esModuleInterop: true,
          allowJs: true
        });
        monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
          noSemanticValidation: false,
          noSyntaxValidation: false,
          noSuggestionDiagnostics: false
        });
        break;
      default:
        break;
    }
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (isEditorReady && editorRef.current && monacoRef.current) {
      const editor = editorRef.current;
      const monaco = monacoRef.current;
      try {
        const model = editor.getModel();
        if (model) {
          monaco.editor.setModelLanguage(model, language);
        }
        setupLanguageServices(monaco, language);
      } catch (error) {
        console.error('Editor language setup error:', error);
      }
    }
  }, [language, isEditorReady, setupLanguageServices]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "M_CodeEditor"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "A_EditorContainer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_monaco_editor_react__WEBPACK_IMPORTED_MODULE_1__/* .Editor */ .KE, {
    height: height,
    language: language,
    value: initialCode,
    onChange: handleEditorChange,
    onMount: handleEditorDidMount,
    options: defaultOptions,
    theme: theme,
    loading: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "A_EditorLoading"
    }, "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0440\u0435\u0434\u0430\u043A\u0442\u043E\u0440\u0430...")
  })));
};
/* harmony default export */ __webpack_exports__["default"] = (MonacoEditor);

/***/ }),

/***/ 807:
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {


// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(540);
// EXTERNAL MODULE: ./node_modules/react-dom/client.js
var client = __webpack_require__(338);
;// ./src/components/CodePreview/CodePreview.jsx

const CodePreview = ({
  code,
  type = 'html',
  height = '400px'
}) => {
  const iframeRef = (0,react.useRef)(null);
  const generateHTML = (0,react.useCallback)(() => {
    const baseHTML = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Code Preview</title>
  <style>
    body {
      margin: 8px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #333;
      background: #fff;
    }
  </style>
</head>
<body>`;
    switch (type) {
      case 'html':
        return `${baseHTML}
  ${code}
</body>
</html>`;
      case 'css':
        return `${baseHTML}
  <style>
    ${code}
  </style>
  
  <div class="preview-content">
    <h1>CSS Preview</h1>
    <p>Your CSS styles will be applied here</p>
    <div class="demo-box">Demo Box</div>
    <button class="demo-button">Demo Button</button>
    <ul class="demo-list">
      <li>List Item 1</li>
      <li>List Item 2</li>
      <li>List Item 3</li>
    </ul>
  </div>
</body>
</html>`;
      case 'javascript':
        return `${baseHTML}
  <div id="preview-container">
    <h1>JavaScript Preview</h1>
    <p>Your JavaScript code will execute here</p>
    <div id="output"></div>
  </div>
  
  <script>
    try {
      ${code}
    } catch (error) {
      document.getElementById('output').innerHTML = \`
        <div style="color: red; padding: 20px; border: 1px solid red; margin: 10px 0;">
          <strong>JavaScript Error:</strong> \${error.message}
        </div>
      \`;
    }
  </script>
</body>
</html>`;
      default:
        return code;
    }
  }, [code, type]);
  const updatePreview = (0,react.useCallback)(() => {
    if (!iframeRef.current) return;
    const iframe = iframeRef.current;
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.open();
    doc.write(generateHTML());
    doc.close();
  }, [generateHTML]);
  (0,react.useEffect)(() => {
    updatePreview();
  }, [updatePreview]);
  return /*#__PURE__*/react.createElement("div", {
    className: "M_CodePreview"
  }, /*#__PURE__*/react.createElement("div", {
    className: "A_PreviewHeader"
  }, /*#__PURE__*/react.createElement("h3", {
    className: "A_PreviewTitle"
  }, "\u041F\u0440\u0435\u0434\u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440")), /*#__PURE__*/react.createElement("div", {
    className: "A_PreviewContainer"
  }, /*#__PURE__*/react.createElement("iframe", {
    ref: iframeRef,
    className: "A_PreviewIframe",
    style: {
      width: '100%',
      height: height,
      border: '1px solid #ddd',
      borderRadius: '4px',
      background: '#fff'
    },
    sandbox: "allow-scripts allow-same-origin",
    title: "Code Preview"
  })));
};
/* harmony default export */ var CodePreview_CodePreview = (CodePreview);
;// ./src/components/ValidationResults/ValidationResults.jsx

const ValidationResults = ({
  results,
  config
}) => {
  if (!results) return null;
  const validationStats = (0,react.useMemo)(() => {
    const validations = results;
    const totalWeight = validations.reduce((sum, validation) => sum + (validation.weight || 1), 0);
    const passedWeight = validations.filter(validation => validation.passed).reduce((sum, validation) => sum + (validation.weight || 1), 0);
    const progress = totalWeight > 0 ? Math.round(passedWeight / totalWeight * 100) : 0;
    return {
      total: validations.length,
      passed: validations.filter(v => v.passed).length,
      failed: validations.filter(v => !v.passed).length,
      progress,
      isComplete: progress === 100,
      totalWeight,
      passedWeight
    };
  }, [results]);
  const getStatusIcon = passed => {
    return passed ? '✅' : '❌';
  };
  const getStatusClass = passed => {
    return passed ? 'A_ValidationItem--passed' : 'A_ValidationItem--failed';
  };
  const getProgressColor = progress => {
    if (progress >= 90) return '#47b881';
    if (progress >= 70) return '#f7b731';
    if (progress >= 40) return '#ff7675';
    return '#d63031';
  };
  return /*#__PURE__*/react.createElement("div", {
    className: "O_ValidationResults"
  }, /*#__PURE__*/react.createElement("div", {
    className: "A_ValidationHeader"
  }, /*#__PURE__*/react.createElement("h3", {
    className: "A_ValidationTitle"
  }, "\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438"), /*#__PURE__*/react.createElement("div", {
    className: "A_ValidationProgress"
  }, validationStats.progress, "% \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u043E")), /*#__PURE__*/react.createElement("div", {
    className: "A_ProgressContainer"
  }, /*#__PURE__*/react.createElement("div", {
    className: "A_ProgressBar"
  }, /*#__PURE__*/react.createElement("div", {
    className: "A_ProgressFill",
    style: {
      width: `${validationStats.progress}%`,
      backgroundColor: getProgressColor(validationStats.progress)
    }
  }))), /*#__PURE__*/react.createElement("div", {
    className: "A_ValidationList"
  }, results.map((validation, index) => {
    const ruleConfig = config?.[index] || {};
    return /*#__PURE__*/react.createElement("div", {
      key: index,
      className: `A_ValidationItem ${getStatusClass(validation.passed)}`
    }, /*#__PURE__*/react.createElement("div", {
      className: "A_ValidationIcon"
    }, getStatusIcon(validation.passed)), /*#__PURE__*/react.createElement("div", {
      className: "A_ValidationContent"
    }, /*#__PURE__*/react.createElement("div", {
      className: "A_ValidationName"
    }, ruleConfig.name || `Правило ${index + 1}`, ruleConfig.required && /*#__PURE__*/react.createElement("span", {
      className: "A_RequiredBadge"
    }, "\u041E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E")), /*#__PURE__*/react.createElement("div", {
      className: "A_ValidationMessage"
    }, validation.message || 'Нет сообщения')), /*#__PURE__*/react.createElement("div", {
      className: "A_ValidationWeight"
    }, validation.weight || ruleConfig.weight || 1, " \u0431\u0430\u043B\u043B", (validation.weight || ruleConfig.weight || 1) > 1 ? 'ов' : ''));
  })), validationStats.isComplete && /*#__PURE__*/react.createElement("div", {
    className: "A_CompletionMessage"
  }, /*#__PURE__*/react.createElement("div", {
    className: "A_CompletionIcon"
  }, "\uD83C\uDF89"), /*#__PURE__*/react.createElement("div", {
    className: "A_CompletionText"
  }, /*#__PURE__*/react.createElement("h4", null, "\u041F\u043E\u0437\u0434\u0440\u0430\u0432\u043B\u044F\u0435\u043C!"), /*#__PURE__*/react.createElement("p", null, "\u0412\u0441\u0435 \u043F\u0440\u0430\u0432\u0438\u043B\u0430 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u044B \u0443\u0441\u043F\u0435\u0448\u043D\u043E!"))));
};
/* harmony default export */ var ValidationResults_ValidationResults = (ValidationResults);
;// ./src/engine/SimpleValidationEngine.js
class SimpleValidationEngine {
  constructor() {
    this.validators = {
      element: new SimpleElementValidator(),
      style: new SimpleStyleValidator(),
      behavior: new SimpleBehaviorValidator(),
      syntax: new SimpleSyntaxValidator()
    };
  }
  async validate(code, type, validationRules) {
    try {
      const results = [];
      for (const rule of validationRules) {
        const validator = this.validators[rule.type];
        if (!validator) {
          results.push({
            id: rule.id,
            name: rule.name,
            passed: false,
            message: `Unknown validator type: ${rule.type}`,
            weight: rule.weight || 1,
            required: rule.required || false
          });
          continue;
        }
        const result = await validator.validate(code, type, rule.config);
        results.push({
          id: rule.id,
          name: rule.name,
          passed: result.passed,
          message: result.message,
          weight: rule.weight || 1,
          required: rule.required || false
        });
      }
      return results;
    } catch (error) {
      console.error('Validation error:', error);
      return [];
    }
  }
}
class SimpleElementValidator {
  async validate(code, type, config) {
    if (type !== 'html') {
      return {
        passed: true,
        message: 'Not HTML code'
      };
    }
    try {
      // Простая проверка HTML элементов
      const doc = new DOMParser().parseFromString(code, 'text/html');
      const parserError = doc.querySelector('parsererror');
      if (parserError) {
        return {
          passed: false,
          message: 'HTML содержит синтаксические ошибки'
        };
      }

      // Проверка конкретных элементов
      if (config.selector) {
        const elements = doc.querySelectorAll(config.selector);
        if (config.exists) {
          return {
            passed: elements.length > 0,
            message: elements.length > 0 ? `Найден элемент ${config.selector}` : `Элемент ${config.selector} не найден`
          };
        }
        if (config.textContent) {
          const element = elements[0];
          if (element && element.textContent.includes(config.textContent)) {
            return {
              passed: true,
              message: `Найден элемент ${config.selector} с текстом "${config.textContent}"`
            };
          }
          return {
            passed: false,
            message: `Элемент ${config.selector} не содержит текст "${config.textContent}"`
          };
        }
      }
      return {
        passed: true,
        message: 'HTML структура корректна'
      };
    } catch (error) {
      return {
        passed: false,
        message: `Ошибка валидации HTML: ${error.message}`
      };
    }
  }
}
class SimpleStyleValidator {
  async validate(code, type, config) {
    if (type !== 'css') {
      return {
        passed: true,
        message: 'Not CSS code'
      };
    }
    try {
      // Простая проверка CSS свойств
      if (config.property) {
        const hasProperty = code.includes(config.property + ':');
        if (config.exists) {
          return {
            passed: hasProperty,
            message: hasProperty ? `Найдено свойство ${config.property}` : `Свойство ${config.property} не найдено`
          };
        }
      }

      // Проверка синтаксиса CSS
      const hasValidSyntax = this.checkCSSSyntax(code);
      return {
        passed: hasValidSyntax,
        message: hasValidSyntax ? 'CSS синтаксис корректен' : 'CSS содержит синтаксические ошибки'
      };
    } catch (error) {
      return {
        passed: false,
        message: `Ошибка валидации CSS: ${error.message}`
      };
    }
  }
  checkCSSSyntax(code) {
    // Простая проверка синтаксиса CSS
    const lines = code.split('\n');
    let braceCount = 0;
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.includes('{')) braceCount++;
      if (trimmed.includes('}')) braceCount--;

      // Проверка на незакрытые скобки
      if (braceCount < 0) return false;
    }
    return braceCount === 0;
  }
}
class SimpleBehaviorValidator {
  async validate(code, type, config) {
    if (type !== 'javascript') {
      return {
        passed: true,
        message: 'Not JavaScript code'
      };
    }
    try {
      // Проверка синтаксиса JavaScript
      const syntaxValid = this.checkJSSyntax(code);
      if (!syntaxValid) {
        return {
          passed: false,
          message: 'JavaScript содержит синтаксические ошибки'
        };
      }

      // Проверка конкретных функций или событий
      if (config.function) {
        const hasFunction = code.includes(`function ${config.function}`) || code.includes(`${config.function} =`);
        if (config.exists) {
          return {
            passed: hasFunction,
            message: hasFunction ? `Найдена функция ${config.function}` : `Функция ${config.function} не найдена`
          };
        }
      }
      if (config.event) {
        const hasEvent = code.includes(`addEventListener('${config.event}'`) || code.includes(`.${config.event}`);
        if (config.exists) {
          return {
            passed: hasEvent,
            message: hasEvent ? `Найдено событие ${config.event}` : `Событие ${config.event} не найдено`
          };
        }
      }
      return {
        passed: true,
        message: 'JavaScript код корректен'
      };
    } catch (error) {
      return {
        passed: false,
        message: `Ошибка валидации JavaScript: ${error.message}`
      };
    }
  }
  checkJSSyntax(code) {
    try {
      new Function(code);
      return true;
    } catch (error) {
      return false;
    }
  }
}
class SimpleSyntaxValidator {
  async validate(code, type, config) {
    try {
      switch (type) {
        case 'html':
          return this.validateHTMLSyntax(code);
        case 'css':
          return this.validateCSSSyntax(code);
        case 'javascript':
          return this.validateJSSyntax(code);
        default:
          return {
            passed: true,
            message: 'Неизвестный тип кода'
          };
      }
    } catch (error) {
      return {
        passed: false,
        message: `Ошибка проверки синтаксиса: ${error.message}`
      };
    }
  }
  validateHTMLSyntax(code) {
    const doc = new DOMParser().parseFromString(code, 'text/html');
    const parserError = doc.querySelector('parsererror');
    return {
      passed: !parserError,
      message: parserError ? 'HTML содержит синтаксические ошибки' : 'HTML синтаксически корректен'
    };
  }
  validateCSSSyntax(code) {
    // Простая проверка CSS
    const lines = code.split('\n');
    let braceCount = 0;
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.includes('{')) braceCount++;
      if (trimmed.includes('}')) braceCount--;
    }
    return {
      passed: braceCount === 0,
      message: braceCount === 0 ? 'CSS синтаксически корректен' : 'CSS содержит незакрытые скобки'
    };
  }
  validateJSSyntax(code) {
    try {
      new Function(code);
      return {
        passed: true,
        message: 'JavaScript синтаксически корректен'
      };
    } catch (error) {
      return {
        passed: false,
        message: `JavaScript содержит синтаксические ошибки: ${error.message}`
      };
    }
  }
}
/* harmony default export */ var engine_SimpleValidationEngine = ((/* unused pure expression or super */ null && (SimpleValidationEngine)));
;// ./src/hooks/useValidation.js


const useValidation = validationConfig => {
  const [results, setResults] = (0,react.useState)(null);
  const [isValidating, setIsValidating] = (0,react.useState)(false);
  const validationEngine = new SimpleValidationEngine();
  const validateCode = (0,react.useCallback)(async (code, type) => {
    if (!validationConfig || !Array.isArray(validationConfig)) {
      return;
    }
    setIsValidating(true);
    try {
      const validationResults = await validationEngine.validate(code, type, validationConfig);
      setResults(validationResults);
    } catch (error) {
      console.error('Validation error:', error);
      setResults([]);
    } finally {
      setIsValidating(false);
    }
  }, [validationConfig]);
  return {
    validateCode,
    results,
    isValidating
  };
};

;// ./src/hooks/useDebounce.js

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = (0,react.useState)(value);
  (0,react.useEffect)(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};

;// ./src/components/CodeExercise/CodeExercise.jsx

const MonacoEditor = /*#__PURE__*/(0,react.lazy)(() => Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 286)));




const CodeExercise = ({
  config
}) => {
  const storageKey = (0,react.useMemo)(() => `exercise:${config.id}:code`, [config.id]);
  const completedKey = (0,react.useMemo)(() => `exercise:${config.id}:completed`, [config.id]);
  const [code, setCode] = (0,react.useState)(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved !== null ? saved : config.initialCode || '';
    } catch (_) {
      return config.initialCode || '';
    }
  });
  const debouncedCode = useDebounce(code, 500);
  const {
    validateCode,
    results,
    isValidating
  } = useValidation(config.validation);
  const handleCodeChange = (0,react.useCallback)(newCode => {
    setCode(newCode);
  }, []);
  (0,react.useEffect)(() => {
    try {
      localStorage.setItem(storageKey, code || '');
    } catch (_) {}
  }, [code, storageKey]);
  const handleValidate = (0,react.useCallback)(async () => {
    await validateCode(code, config.type);
  }, [code, config.type, validateCode]);
  (0,react.useEffect)(() => {
    if (!results || !Array.isArray(results)) return;
    const isAllPassed = results.every(r => r && r.passed);
    try {
      localStorage.setItem(completedKey, isAllPassed ? 'true' : 'false');
    } catch (_) {}
  }, [results, completedKey]);
  return /*#__PURE__*/react.createElement("div", {
    className: "S_ExerciseWorkspace"
  }, /*#__PURE__*/react.createElement("div", {
    className: "O_ExerciseHeader"
  }, /*#__PURE__*/react.createElement("h2", {
    className: "A_ExerciseTitle"
  }, config.title), /*#__PURE__*/react.createElement("p", {
    className: "A_ExerciseDescription"
  }, config.description)), /*#__PURE__*/react.createElement("div", {
    className: "O_ExerciseContent"
  }, /*#__PURE__*/react.createElement("div", {
    className: "O_CodeEditor"
  }, /*#__PURE__*/react.createElement("div", {
    className: "M_EditorHeader"
  }, /*#__PURE__*/react.createElement("h3", {
    className: "A_EditorTitle"
  }, "\u0420\u0435\u0434\u0430\u043A\u0442\u043E\u0440 \u043A\u043E\u0434\u0430"), /*#__PURE__*/react.createElement("button", {
    className: "A_Button A_ButtonPrimary",
    onClick: handleValidate,
    disabled: isValidating
  }, isValidating ? 'Проверяем...' : 'Проверить')), /*#__PURE__*/react.createElement(react.Suspense, {
    fallback: /*#__PURE__*/react.createElement("div", {
      className: "A_EditorLoading"
    }, "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0440\u0435\u0434\u0430\u043A\u0442\u043E\u0440\u0430...")
  }, /*#__PURE__*/react.createElement(MonacoEditor, {
    language: config.type,
    initialCode: config.initialCode,
    onChange: handleCodeChange
  }))), /*#__PURE__*/react.createElement("div", {
    className: "O_CodePreview"
  }, /*#__PURE__*/react.createElement(CodePreview_CodePreview, {
    code: debouncedCode,
    type: config.type
  }))), results && /*#__PURE__*/react.createElement("div", {
    className: "O_ValidationPanel"
  }, /*#__PURE__*/react.createElement(ValidationResults_ValidationResults, {
    results: results,
    config: config.validation
  })));
};
/* harmony default export */ var CodeExercise_CodeExercise = (CodeExercise);
// EXTERNAL MODULE: ./src/components/MonacoEditor/MonacoEditor.jsx
var MonacoEditor_MonacoEditor = __webpack_require__(286);
;// ./src/components/ExerciseNavigation/ExerciseNavigation.jsx

const ExerciseNavigation = ({
  exercises,
  currentExerciseIndex,
  onExerciseChange
}) => {
  return /*#__PURE__*/react.createElement("div", {
    className: "O_ExerciseNavigation"
  }, /*#__PURE__*/react.createElement("div", {
    className: "A_NavigationTitle"
  }, /*#__PURE__*/react.createElement("h2", null, "\u0423\u043F\u0440\u0430\u0436\u043D\u0435\u043D\u0438\u044F")), /*#__PURE__*/react.createElement("div", {
    className: "A_NavigationList"
  }, exercises.map((exercise, index) => /*#__PURE__*/react.createElement("button", {
    key: exercise.id,
    className: `A_NavigationButton ${index === currentExerciseIndex ? 'A_NavigationButton--active' : ''}`,
    onClick: () => onExerciseChange(index)
  }, /*#__PURE__*/react.createElement("div", {
    className: "A_ExerciseIcon"
  }, exercise.type === 'html' && '🌐', exercise.type === 'css' && '🎨', exercise.type === 'javascript' && '⚡'), /*#__PURE__*/react.createElement("div", {
    className: "A_ExerciseInfo"
  }, /*#__PURE__*/react.createElement("div", {
    className: "A_ExerciseName"
  }, exercise.title), /*#__PURE__*/react.createElement("div", {
    className: "A_ExerciseTime"
  }, exercise.estimatedTime))))));
};
/* harmony default export */ var ExerciseNavigation_ExerciseNavigation = (ExerciseNavigation);
;// ./src/components/index.js





;// ./src/exercises/html-basic/exercise.json
var exercise_namespaceObject = /*#__PURE__*/JSON.parse('{"id":"html-basic-structure","title":"HTML Базовая структура","description":"Создайте простую HTML страницу с заголовком и параграфом. Изучите основные HTML теги.","type":"html","difficulty":"beginner","estimatedTime":"5 минут","initialCode":"<!DOCTYPE html>\\n<html>\\n<head>\\n  <title></title>\\n</head>\\n<body>\\n  \\n</body>\\n</html>","validation":[{"id":"title-exists","name":"Заголовок страницы установлен","type":"element","config":{"selector":"title","exists":true,"textContent":"Моя первая страница"},"weight":25,"required":true},{"id":"h1-exists","name":"Главный заголовок присутствует","type":"element","config":{"selector":"h1","exists":true},"weight":35,"required":true},{"id":"paragraph-exists","name":"Параграф с текстом добавлен","type":"element","config":{"selector":"p","exists":true},"weight":35,"required":true},{"id":"valid-html","name":"HTML синтаксически корректен","type":"syntax","config":{},"weight":5,"required":true}],"hints":["Используйте тег <title> для установки заголовка страницы","Добавьте тег <h1> для главного заголовка","Используйте тег <p> для создания параграфа","Все теги должны быть правильно закрыты"],"learningObjectives":["Понимание базовой HTML структуры","Использование основных HTML тегов","Правильное закрытие тегов"]}');
;// ./src/exercises/css-styling/exercise.json
var css_styling_exercise_namespaceObject = /*#__PURE__*/JSON.parse('{"id":"css-basic-styling","title":"CSS Стилизация","description":"Стилизуйте элементы страницы с помощью CSS. Добавьте цвета, размеры шрифтов и отступы.","type":"css","difficulty":"beginner","estimatedTime":"10 минут","initialCode":"/* Стилизуйте элементы на странице */\\n/* Добавьте цвета, размеры шрифтов и отступы */","validation":[{"id":"color-property","name":"Использовано свойство color","type":"style","config":{"property":"color","exists":true},"weight":30,"required":true},{"id":"background-property","name":"Использовано свойство background","type":"style","config":{"property":"background","exists":true},"weight":30,"required":true},{"id":"font-size-property","name":"Использовано свойство font-size","type":"style","config":{"property":"font-size","exists":true},"weight":30,"required":true},{"id":"valid-css","name":"CSS синтаксически корректен","type":"syntax","config":{},"weight":10,"required":true}],"hints":["Свойство color изменяет цвет текста","Свойство background изменяет фон элемента","Свойство font-size изменяет размер шрифта","Не забудьте точку с запятой в конце каждого свойства"],"learningObjectives":["Понимание CSS селекторов","Использование базовых CSS свойств","Синтаксис CSS правил","Стилизация текста и фона"]}');
;// ./src/exercises/js-interaction/exercise.json
var js_interaction_exercise_namespaceObject = /*#__PURE__*/JSON.parse('{"id":"js-basic-interaction","title":"JavaScript Взаимодействие","description":"Создайте JavaScript код для обработки клика и изменения содержимого страницы.","type":"javascript","difficulty":"beginner","estimatedTime":"15 минут","initialCode":"// Добавьте обработчик клика\\n\\nfunction handleClick() {\\n  // Измените текст или стиль элемента при клике\\n  console.log(\'Кнопка нажата!\');\\n}\\n\\n// Добавьте обработчик события после загрузки DOM\\ndocument.addEventListener(\'DOMContentLoaded\', function() {\\n  // Найдите кнопку и добавьте обработчик клика\\n});","validation":[{"id":"click-handler","name":"Обработчик события клика создан","type":"behavior","config":{"function":"handleClick","exists":true},"weight":40,"required":true},{"id":"event-listener","name":"Событие click добавлено","type":"behavior","config":{"event":"click","exists":true},"weight":40,"required":true},{"id":"valid-js","name":"JavaScript синтаксически корректен","type":"syntax","config":{},"weight":20,"required":true}],"hints":["Создайте функцию handleClick для обработки клика","Используйте addEventListener для добавления обработчика события","Не забудьте добавить обработчик после загрузки DOM","Используйте querySelector для поиска элементов"],"learningObjectives":["Понимание DOM манипуляций","Работа с событиями JavaScript","Создание интерактивных функций","Обработка пользовательского ввода"]}');
;// ./src/exercises/index.js



const exercises = [exercise_namespaceObject, css_styling_exercise_namespaceObject, js_interaction_exercise_namespaceObject];
const getExerciseById = id => {
  return exercises.find(exercise => exercise.id === id);
};
const getExercisesByType = type => {
  return exercises.filter(exercise => exercise.type === type);
};
/* harmony default export */ var src_exercises = ((/* unused pure expression or super */ null && (exercises)));
;// ./src/javascript/App.jsx



const App = () => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = (0,react.useState)(() => {
    try {
      const saved = localStorage.getItem('currentExerciseIndex');
      const parsed = saved !== null ? parseInt(saved, 10) : 0;
      if (Number.isNaN(parsed)) return 0;
      return Math.min(Math.max(parsed, 0), exercises.length - 1);
    } catch (_) {
      return 0;
    }
  });
  (0,react.useEffect)(() => {
    try {
      localStorage.setItem('currentExerciseIndex', String(currentExerciseIndex));
    } catch (_) {}
  }, [currentExerciseIndex]);
  const currentExercise = exercises[currentExerciseIndex];
  const progress = (0,react.useMemo)(() => {
    try {
      const states = exercises.map(ex => {
        const key = `exercise:${ex.id}:completed`;
        return localStorage.getItem(key) === 'true';
      });
      const done = states.filter(Boolean).length;
      const total = states.length;
      const percent = total > 0 ? Math.round(done / total * 100) : 0;
      return {
        done,
        total,
        percent
      };
    } catch (_) {
      return {
        done: 0,
        total: exercises.length,
        percent: 0
      };
    }
  }, [currentExerciseIndex]);
  const handleExerciseChange = index => {
    setCurrentExerciseIndex(index);
  };
  return /*#__PURE__*/react.createElement("div", {
    className: "S_LearningPlatform"
  }, /*#__PURE__*/react.createElement("header", {
    className: "O_AppHeader"
  }, /*#__PURE__*/react.createElement("h1", {
    className: "A_Title"
  }, "\u041F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0430 \u0438\u0437\u0443\u0447\u0435\u043D\u0438\u044F \u0432\u0435\u0431-\u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0438"), /*#__PURE__*/react.createElement("p", {
    className: "A_Subtitle"
  }, "3 \u0443\u043F\u0440\u0430\u0436\u043D\u0435\u043D\u0438\u044F: HTML, CSS, JavaScript"), /*#__PURE__*/react.createElement("div", {
    className: "A_ProgressContainer"
  }, /*#__PURE__*/react.createElement("div", {
    className: "A_ProgressBar"
  }, /*#__PURE__*/react.createElement("div", {
    className: "A_ProgressFill",
    style: {
      width: `${progress.percent}%`
    }
  })), /*#__PURE__*/react.createElement("p", {
    className: "A_ProgressText"
  }, "\u0412\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u043E: ", progress.done, "/", progress.total, " (", progress.percent, "%)"))), /*#__PURE__*/react.createElement("main", {
    className: "O_AppMain"
  }, /*#__PURE__*/react.createElement("div", {
    className: "O_AppContent"
  }, /*#__PURE__*/react.createElement("div", {
    className: "O_ExerciseNavigation"
  }, /*#__PURE__*/react.createElement(ExerciseNavigation_ExerciseNavigation, {
    exercises: exercises,
    currentExerciseIndex: currentExerciseIndex,
    onExerciseChange: handleExerciseChange
  })), /*#__PURE__*/react.createElement("div", {
    className: "O_ExerciseContent"
  }, /*#__PURE__*/react.createElement(CodeExercise_CodeExercise, {
    key: currentExercise.id,
    config: currentExercise
  })))));
};
/* harmony default export */ var javascript_App = (App);
;// ./src/index.js




const container = document.getElementById('root');
const root = (0,client.createRoot)(container);
root.render(/*#__PURE__*/react.createElement(javascript_App, null));

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [96], function() { return __webpack_exec__(807); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);