import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './new-task-form.css'

const NewTaskForm = (props) => {
  const [inputValue, setInputValue] = useState({
    text: '',
    min: '',
    sec: '',
  })

  const { addItem } = props

  const onSubmit = (e) => {
    e.preventDefault()
    addItem(inputValue.text, Number(inputValue.min), Number(inputValue.sec))
    setInputValue({
      text: '',
      min: '',
      sec: '',
    })
    e.target.reset()
  }

  return (
    <form className="new-todo-form" onSubmit={onSubmit}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        onChange={(e) => setInputValue({ ...inputValue, text: e.target.value })}
        value={inputValue.text}
        required
      />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        type="number"
        min="0"
        max="59"
        onChange={(e) => setInputValue({ ...inputValue, min: e.target.value })}
        value={inputValue.min}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        type="number"
        min="0"
        max="59"
        onChange={(e) => setInputValue({ ...inputValue, sec: e.target.value })}
        value={inputValue.sec}
      />
      <button type="submit" />
    </form>
  )
}

export default NewTaskForm

NewTaskForm.defaultProps = {
  addItem: () => {},
}

NewTaskForm.propTypes = {
  addItem: PropTypes.func,
}
