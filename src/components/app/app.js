import React, { Component } from 'react'

import Footer from '../footer/footer'
import NewTaskForm from '../new-task-form/new-task-form'
import TaskList from '../task-list/task-list'

import './app.css'

export default class App extends Component {
  maxId = 100

  state = {
    todoData: [],

    filter: 'All',
  }

  todoFilter(status) {
    this.setState({ filter: status })
  }

  changeCheck(index, data) {
    this.setState(({ todoData }) =>
      todoData.map((el) => {
        if (index === el.id) {
          el.done = data
        }
        return el
      })
    )
  }

  clearCompleted = () => {
    this.setState(({ todoData }) => ({ todoData: todoData.filter((el) => !el.done) }))
  }

  changeEditing = (id) => {
    const index = this.state.todoData.findIndex((el) => el.id === id)

    if (!this.state.todoData[index].done) {
      this.setState(({ todoData }) => {
        todoData.map((el) => (el.editing = false))
        const editItem = {
          ...todoData[index],
          editing: true,
        }

        return {
          todoData: [...todoData.slice(0, index), editItem, ...todoData.slice(index + 1)],
        }
      })
    }
  }

  addItem = (text, min, sec) => {
    const newItem = {
      text: text,
      done: false,
      editing: false,
      id: this.maxId++,
      date: new Date(),
      timer: min * 60 + sec,
      timerId: null,
    }

    this.setState(({ todoData }) => ({ todoData: [...todoData, newItem] }))
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => el.id === id)

      if (todoData[index].timerId) {
        clearInterval(todoData[index].timerId)
      }

      return {
        todoData: [...todoData.slice(0, index), ...todoData.slice(index + 1)],
      }
    })
  }

  editItem = (text, id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => el.id === id)

      const editItem = {
        ...todoData[index],
        text: text,
        editing: false,
      }

      return {
        todoData: [...todoData.slice(0, index), editItem, ...todoData.slice(index + 1)],
      }
    })
  }

  onTimerUpdate = (id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => el.id === id)

      const { timer } = todoData[index]

      const newItem = {
        ...todoData[index],
        timer: timer - 1,
      }

      return {
        todoData: [...todoData.slice(0, index), newItem, ...todoData.slice(index + 1)],
      }
    })
  }

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm addItem={this.addItem} />
        </header>

        <section className="main">
          <TaskList
            todos={this.state.todoData}
            filter={this.state.filter}
            changeCheck={this.changeCheck.bind(this)}
            deleteItem={this.deleteItem}
            editItem={this.editItem}
            changeEditing={this.changeEditing}
            onTimerUpdate={this.onTimerUpdate}
          />
          <Footer
            todos={this.state.todoData}
            filter={this.state.filter}
            todoFilter={this.todoFilter.bind(this)}
            clearCompleted={this.clearCompleted}
          />
        </section>
      </section>
    )
  }
}
