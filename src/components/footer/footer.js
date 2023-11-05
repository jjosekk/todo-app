import React from 'react'
import PropTypes from 'prop-types'

import TaskFilter from '../task-filter/task-filter'

import './footer.css'

const Footer = (props) => {
  const { todos, filterStatus, setFIlterStatus, clearCompleted } = props

  return (
    <footer className="footer">
      <span className="todo-count">{todos.filter((el) => !el.done).length} items left</span>
      <TaskFilter filterStatus={filterStatus} setFIlterStatus={setFIlterStatus} />
      <button className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.defaultProps = {
  todos: [],
  filterStatus: 'All',
  setFIlterStatus: () => {},
  clearCompleted: () => {},
}

Footer.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  filterStatus: PropTypes.string,
  setFIlterStatus: PropTypes.func,
  clearCompleted: PropTypes.func,
}

export default Footer
