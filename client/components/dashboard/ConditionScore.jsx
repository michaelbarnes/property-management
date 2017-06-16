import React, { Component } from 'react';
import ReactDom from 'react-dom';

import { Meteor } from 'meteor/meteor';

export default class ConditionScore extends Component {
  constructor() {
    super();
  }

  render () {
    return (
      <div className={'circleBase ' + this.props.condition}></div>
    )
  }
}
