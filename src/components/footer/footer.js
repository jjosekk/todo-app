import React from 'react'
import PropTypes from 'prop-types'

import TaskFilter from '../task-filter/task-filter'

import './footer.css'

const Footer = (props) => {
  const { todos, filter, todoFilter, clearCompleted } = props
  const todoCount = todos.filter((el) => !el.done).length

  return (
    <footer className="footer">
      <span className="todo-count">{todoCount} items left</span>
      <TaskFilter filter={filter} todoFilter={todoFilter} />
      <button className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.defaultProps = {
  todos: [],
  filter: 'All',
  todoFilter: () => {},
  clearCompleted: () => {},
}

Footer.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  filter: PropTypes.string,
  todoFilter: PropTypes.func,
  clearCompleted: PropTypes.func,
}

export default Footer
