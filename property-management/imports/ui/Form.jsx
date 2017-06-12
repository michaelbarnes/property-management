import React, { Component, PropTypes } from 'react';

export default class Form extends Component {
  render() {
    return (
        <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
        <input
            type="text"
            ref="textInput"
            placeholder="Type to add new tasks"
        />
        </form>
    );
  }
}
