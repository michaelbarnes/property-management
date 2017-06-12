import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Meteor } from 'meteor/meteor';

import ContextItem from './ContextItem';

export default class ContentItem extends Component {
  constructor() {
    super();
  }

  render () {
    return (this.props.list.map(
      (item) =>
      <ContextItem value="23"></ContextItem>
    ));
  }
}
