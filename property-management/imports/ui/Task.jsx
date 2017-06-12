import React, { Component, PropTypes } from 'react';

import { Tasks } from '../api/Tasks.js';

// Task component - represents a single todo item
export default class Task extends Component {

  toggleChecked() {
    Tasks.update(this.props.task._id, {
      $set: { check: !this.props.task.check },
    });
  }

  deleteTask() {
    Tasks.update(this.props.task._id, {
      $set: { visible: !this.props.task.visible },
    });
  }

  render() {

    const taskClassName = this.props.task.check ? 'checked' : '';

    return (
      <li className={taskClassName}>
        <button className="delete" onClick={this.deleteTask.bind(this)}>
          &times;
        </button>

        <input
          type="checkbox"
          readOnly
          checked={this.props.task.check}
          onClick={this.toggleChecked.bind(this)}
        />

        <span className="text">
            <strong>{this.props.task.createdBy}</strong> : {this.props.task.text}
        </span>
      </li>
    );
  }
}

Task.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  task: PropTypes.object.isRequired,
};
