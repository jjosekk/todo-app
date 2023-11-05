import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

const Task = (props) => {
  const [inputValue, setInputValue] = useState('')
  const [timerStarted, setTimerStarted] = useState(false)

  const { setCompletedStatus, deleteItem, item, handleEdit, onTimerUpdate, editItem } = props
  const { text, done, id, date, editing, timer, timerId } = item

  if (timer === 0 || done) clearInterval(timerId)

  const onInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    editItem(inputValue, id)
  }

  return (
    <li className={done ? 'completed' : editing ? 'editing' : null}>
      <div className="view">
        <input
          id={id}
          className="toggle"
          type="checkbox"
          onChange={(e) => {
            if (timerStarted) {
              clearInterval(item.timerId)
              setTimerStarted(false)
            }
            setCompletedStatus(id, e.target.checked)
          }}
          checked={done}
        />
        <label htmlFor={id}>
          <span className="title">{text}</span>
          <span className="description">
            <button
              className="icon icon-play"
              onClick={() => {
                if (timer > 0 && !done && !timerStarted) {
                  item.timerId = setInterval(() => onTimerUpdate(id), 1000)
                  setTimerStarted(true)
                }
              }}
            ></button>
            <button
              className="icon icon-pause"
              onClick={() => {
                clearInterval(timerId)
                setTimerStarted(false)
              }}
            ></button>
            {`${Math.floor(timer / 60)}:${timer % 60}`}
          </span>
          <span className="description">{`created ${formatDistanceToNow(date, {
            addSuffix: true,
            includeSeconds: true,
          })}`}</span>
        </label>
        <button className="icon icon-edit" onClick={handleEdit}></button>
        <button className="icon icon-destroy" onClick={deleteItem}></button>
      </div>

      {editing && (
        <form onSubmit={onSubmit}>
          <input type="text" className="edit" value={inputValue} onChange={onInputChange} />
        </form>
      )}
    </li>
  )
}

export default Task

Task.defaultProps = {
  item: {},
  setCompletedStatus: () => {},
  deleteItem: () => {},
  editItem: () => {},
  handleEdit: () => {},
}

Task.propTypes = {
  item: PropTypes.object,
  setCompletedStatus: PropTypes.func,
  deleteItem: PropTypes.func,
  editItem: PropTypes.func,
  handleEdit: PropTypes.func,
}
