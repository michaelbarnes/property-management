import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Meteor } from 'meteor/meteor';

export default class LeftBar extends Component {
  constructor() {

    super();

    this.state = {
      navItems: [
        {'value': 'Properties', 'state': 'active', 'eventKey': 0},
        {'value': 'Tasks', 'state': 'notActive', 'eventKey': 1},
        {'value': 'Tennants', 'state': 'notActive', 'eventKey': 2},
        {'value': 'Contractors', 'state': 'notActive', 'eventKey': 3},
        {'value': 'Owners', 'state': 'notActive', 'eventKey': 4}
      ]
    }

  }

  renderNav() {
    return (this.state.navItems.map(
      (nav) =>
        <li>{nav.value}</li>
    ));
  }

  render () {
    return (
      <div className="leftBar">
        <ul>
          {this.renderNav()}
        </ul>
      </div>
    )
  }
}
