import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './new-task-form.css'

export default class NewTaskForm extends Component {
  state = {
    text: '',
    min: '',
    sec: '',
  }

  onLabelChange = (e) => {
    this.setState({
      text: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.addItem(this.state.text, Number(this.state.min), Number(this.state.sec))
    this.setState({
      text: '',
      min: '',
      sec: '',
    })
    e.target.reset()
  }

  render() {
    return (
      <form className="new-todo-form" onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.onLabelChange}
          value={this.state.text}
          required
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          type="number"
          min="0"
          max="59"
          onChange={(e) => this.setState({ min: e.target.value })}
          value={this.state.min}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          type="number"
          min="0"
          max="59"
          onChange={(e) => this.setState({ sec: e.target.value })}
          value={this.state.sec}
        />
        <button type="submit" />
      </form>
    )
  }
}

NewTaskForm.defaultProps = {
  addItem: () => {},
}

NewTaskForm.propTypes = {
  addItem: PropTypes.func,
}
