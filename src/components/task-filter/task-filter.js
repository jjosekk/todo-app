import React from 'react'
import PropTypes from 'prop-types'

import './task-filter.css'

const TaskFilter = (props) => {
  const { filterStatus, setFIlterStatus } = props

  return (
    <ul className="filters">
      <li>
        <button
          type="button"
          className={filterStatus === 'All' ? 'selected' : null}
          onClick={() => setFIlterStatus('All')}
        >
          All
        </button>
      </li>
      <li>
        <button
          type="button"
          className={filterStatus === 'Active' ? 'selected' : null}
          onClick={() => setFIlterStatus('Active')}
        >
          Active
        </button>
      </li>
      <li>
        <button
          type="button"
          className={filterStatus === 'Completed' ? 'selected' : null}
          onClick={() => setFIlterStatus('Completed')}
        >
          Completed
        </button>
      </li>
    </ul>
  )
}

export default TaskFilter

TaskFilter.defaultProps = {
  filterStatus: 'All',
  setFIlterStatus: () => {},
}

TaskFilter.propTypes = {
  filterStatus: PropTypes.string,
  setFIlterStatus: PropTypes.func,
}
