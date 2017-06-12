import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Meteor } from 'meteor/meteor';

export default class ContextList extends Component {
  constructor() {
    super();
  }

  render () {
    return (
      <div className="leftBarItem">
        <li>{this.props.value}</li>
      </div>
    );
  }
}
