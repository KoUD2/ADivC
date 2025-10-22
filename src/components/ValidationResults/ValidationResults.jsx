import React from 'react'

const ValidationResults = ({ results = [], config = [] }) => {
  // Map results by id for quick lookup
  const statusById = (Array.isArray(results) ? results : []).reduce(
    (acc, r) => ({ ...acc, [r.id]: r.passed }),
    {}
  )

  return (
    <div className="M_ValidationResults">
      <h3 className="A_header3">Чеклист для проверки</h3>
      <ul>
        {(Array.isArray(config) ? config : []).map((rule, i) => {
          const id = rule.id || rule.message || String(i)
          const passed =
            typeof statusById[id] === 'boolean' ? statusById[id] : null
          const cls =
            passed === null ? 'is-pending' : passed ? 'is-passed' : 'is-failed'
          return (
            <li key={id} className={cls}>
              {rule.message || id}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default ValidationResults
