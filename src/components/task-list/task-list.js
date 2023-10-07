import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Task from '../task/task'

import './task-list.css'

export default class TaskList extends Component {
  render() {
    const { changeCheck, deleteItem, todos, filter, editItem, changeEditing } = this.props

    const filterArr = todos.filter((el) => {
      if (filter === 'Active') {
        return !el.done
      }
      if (filter === 'Completed') {
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
            changeCheck={changeCheck}
            deleteItem={() => deleteItem(item.id)}
            editItem={editItem}
            changeEditing={changeEditing}
          />
        ))}
      </ul>
    )
  }
}

TaskList.defaultProps = {
  changeCheck: () => {},
  deleteItem: () => {},
  editItem: () => {},
  changeEditing: () => {},
  todos: [],
  filter: 'All',
}

TaskList.propTypes = {
  changeCheck: PropTypes.func,
  deleteItem: PropTypes.func,
  editItem: PropTypes.func,
  changeEditing: PropTypes.func,
  todos: PropTypes.arrayOf(PropTypes.object),
  filter: PropTypes.string,
}
