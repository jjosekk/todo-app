import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

export default class Task extends Component {
  state = {
    value: this.props.item.text,
  }

  componentDidUpdate() {
    if (this.props.item.timer === 0 || this.props.item.done) clearInterval(this.props.item.timerId)
  }

  onInputChange = (e) => {
    this.setState({
      value: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.editItem(this.state.value, this.props.item.id)
  }

  render() {
    const { changeCheck, deleteItem, item, changeEditing, onTimerUpdate } = this.props
    const { text, done, id, date, editing, timer, timerId } = item

    return (
      <li className={done ? 'completed' : editing ? 'editing' : null}>
        <div className="view">
          <input
            id={id}
            className="toggle"
            type="checkbox"
            onChange={(e) => changeCheck(id, e.target.checked)}
            checked={done}
          />
          <label htmlFor={id}>
            <span className="title">{text}</span>
            <span className="description">
              <button
                className="icon icon-play"
                onClick={() => {
                  if (timer > 0 && !done) {
                    item.timerId = setInterval(() => onTimerUpdate(id), 1000)
                  }
                }}
              ></button>
              <button
                className="icon icon-pause"
                onClick={() => {
                  clearInterval(timerId)
                }}
              ></button>
              {`${Math.floor(timer / 60)}:${timer % 60}`}
            </span>
            <span className="description">{`created ${formatDistanceToNow(date, {
              addSuffix: true,
              includeSeconds: true,
            })}`}</span>
          </label>
          <button className="icon icon-edit" onClick={() => changeEditing(id)}></button>
          <button className="icon icon-destroy" onClick={deleteItem}></button>
        </div>

        {editing && (
          <form onSubmit={this.onSubmit}>
            <input type="text" className="edit" value={this.state.value} onChange={this.onInputChange} />
          </form>
        )}
      </li>
    )
  }
}

Task.defaultProps = {
  item: {},
  changeCheck: () => {},
  deleteItem: () => {},
  editItem: () => {},
  changeEditing: () => {},
}

Task.propTypes = {
  item: PropTypes.object,
  changeCheck: PropTypes.func,
  deleteItem: PropTypes.func,
  editItem: PropTypes.func,
  changeEditing: PropTypes.func,
}
