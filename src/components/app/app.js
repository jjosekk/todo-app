import React, { useState } from 'react'

import NewTaskForm from '../new-task-form/new-task-form'
import TaskList from '../task-list/task-list'
import Footer from '../footer/footer'

import './app.css'

const App = () => {
  const [data, setData] = useState([])
  const [taskId, setTaskId] = useState(1)
  const [filter, setFilter] = useState('All')

  const onTimerUpdate = (id) => {
    setData((data) => {
      const index = data.findIndex((el) => el.id === id)

      const { timer } = data[index]

      const newItem = {
        ...data[index],
        timer: timer - 1,
      }

      return [...data.slice(0, index), newItem, ...data.slice(index + 1)]
    })
  }

  const setFIlterStatus = (status) => {
    setFilter(status)
  }

  const clearCompleted = () => {
    setData(data.filter((el) => !el.done))
  }

  const addItem = (text, min, sec) => {
    const newItem = {
      text: text,
      done: false,
      editing: false,
      id: taskId,
      date: new Date(),
      timer: min * 60 + sec,
      timerId: null,
    }

    setData([...data, newItem])
    setTaskId(taskId + 1)
  }

  const deleteItem = (id) => {
    const index = data.findIndex((el) => el.id === id)

    if (data[index].timerId) clearInterval(data[index].timerId)

    setData([...data.slice(0, index), ...data.slice(index + 1)])
  }

  const setCompletedStatus = (id) => {
    const index = data.findIndex((el) => el.id === id)
    const completed = !data[index].done

    const newItem = {
      ...data[index],
      done: completed,
    }
    setData([...data.slice(0, index), newItem, ...data.slice(index + 1)])
  }

  const handleEdit = (id) => {
    const index = data.findIndex((el) => el.id === id)

    if (!data[index].done) {
      const newItem = {
        ...data[index],
        editing: true,
      }

      setData([...data.slice(0, index), newItem, ...data.slice(index + 1)])
    }
  }

  const editItem = (text, id) => {
    const index = data.findIndex((el) => el.id === id)

    const newItem = {
      ...data[index],
      text: text,
      editing: false,
    }

    setData([...data.slice(0, index), newItem, ...data.slice(index + 1)])
  }

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm addItem={addItem} />
      </header>

      <section className="main">
        <TaskList
          todos={data}
          filterStatus={filter}
          setCompletedStatus={setCompletedStatus}
          deleteItem={deleteItem}
          editItem={editItem}
          handleEdit={handleEdit}
          onTimerUpdate={onTimerUpdate}
        />
        <Footer todos={data} filterStatus={filter} setFIlterStatus={setFIlterStatus} clearCompleted={clearCompleted} />
      </section>
    </section>
  )
}

export default App
