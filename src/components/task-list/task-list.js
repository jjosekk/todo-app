import React from 'react'
import PropTypes from 'prop-types'

import Task from '../task/task'

import './task-list.css'

const TaskList = (props) => {
  const { deleteItem, todos, filterStatus, setCompletedStatus, onTimerUpdate, handleEdit, editItem } = props

  const filterArr = todos.filter((el) => {
    if (filterStatus === 'Active') {
      return !el.done
    }
    if (filterStatus === 'Completed') {
      return el.done
    }
    return el
  })

  return (
    <ul className="todo-list">
      {filterArr.map((item) => (
        <Task
          key={item.id}
          item={item}
          deleteItem={() => deleteItem(item.id)}
          handleEdit={() => handleEdit(item.id)}
          editItem={editItem}
          setCompletedStatus={setCompletedStatus}
          onTimerUpdate={onTimerUpdate}
        />
      ))}
    </ul>
  )
}

export default TaskList

TaskList.defaultProps = {
  setCompletedStatus: () => {},
  deleteItem: () => {},
  editItem: () => {},
  handleEdit: () => {},
  todos: [],
  filterStatus: 'All',
}

TaskList.propTypes = {
  setCompletedStatus: PropTypes.func,
  deleteItem: PropTypes.func,
  editItem: PropTypes.func,
  handleEdit: PropTypes.func,
  todos: PropTypes.arrayOf(PropTypes.object),
  filterStatus: PropTypes.string,
}
