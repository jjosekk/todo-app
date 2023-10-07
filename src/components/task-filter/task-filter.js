import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './task-filter.css'

export default class TaskFilter extends Component {
  render() {
    const { filter, todoFilter } = this.props
    return (
      <ul className="filters">
        <li>
          <button type="button" className={filter === 'All' ? 'selected' : null} onClick={() => todoFilter('All')}>
            All
          </button>
        </li>
        <li>
          <button
            type="button"
            className={filter === 'Active' ? 'selected' : null}
            onClick={() => todoFilter('Active')}
          >
            Active
          </button>
        </li>
        <li>
          <button
            type="button"
            className={filter === 'Completed' ? 'selected' : null}
            onClick={() => todoFilter('Completed')}
          >
            Completed
          </button>
        </li>
      </ul>
    )
  }
}

TaskFilter.defaultProps = {
  filter: 'All',
  todoFilter: () => {},
}

TaskFilter.propTypes = {
  filter: PropTypes.string,
  todoFilter: PropTypes.func,
}
