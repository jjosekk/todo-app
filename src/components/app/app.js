import React, { Component } from 'react'

import Footer from '../footer/footer'
import NewTaskForm from '../new-task-form/new-task-form'
import TaskList from '../task-list/task-list'

import './app.css'

export default class App extends Component {
  maxId = 100;

  state = {


    todoData: [
      { text: 'Completed task', id: 1, done: true, editing: false, date: new Date('2022-05-25') },
      { text: 'Editing task', id: 2, done: false, editing: false, date: new Date('1970-07-25') },
      { text: 'Active task', id: 3, done: false, editing: false, date: new Date('2023-10-05') },
    ],

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

  addItem = (text) => {
    const newItem = {
      text: text,
      done: false,
      editing: false,
      id: this.maxId++,
      date: new Date(),
    }

    this.setState(({ todoData }) => ({ todoData: [...todoData, newItem] }))
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => el.id === id)

      return {
        todoData: [...todoData.slice(0, index), ...todoData.slice(index + 1)],
      }
    })
  }

  editItem = (text, id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => el.id === id)

      const editItem = {
        text: text,
        done: false,
        editing: false,
        id: id,
        date: todoData[index].date,
      }

      return {
        todoData: [...todoData.slice(0, index), editItem, ...todoData.slice(index + 1)],
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
