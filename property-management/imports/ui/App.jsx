import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Meteor } from 'meteor/meteor';

import Card from './dashboard/Card.jsx';

export default class App extends Component {
  constructor() {

    super();

    this.state = {
      navItems: [
        {'value': 'Properties', 'state': 'active', 'eventKey': 0, 'icon': '/assets/dashboard.png'},
        {'value': 'Inspections', 'state': 'notActive', 'eventKey': 1, 'icon': '/assets/dashboard.png'},
        {'value': 'Tennants', 'state': 'notActive', 'eventKey': 2, 'icon': '/assets/dashboard.png'},
        {'value': 'Contractors', 'state': 'notActive', 'eventKey': 3, 'icon': '/assets/dashboard.png'},
        {'value': 'Owners', 'state': 'notActive', 'eventKey': 4, 'icon': '/assets/dashboard.png'}
      ]
    }
  }

  renderNav() {
    return (this.state.navItems.map(
      (nav) =>
        <li navItem>
          {nav.value}
        </li>
    ));
  }

  render () {
    return (
      <div className="background">
        <div className="topBar">
          <ul>
            <li>
              <img src="/assets/hamburger.png"/>
            </li>
            <li>
              <h4>PROPERTY MANAGEMENT</h4>
            </li>
          </ul>
          <div className="profile right">
            <div className="icon left">
              <img src="/assets/default_profile.png"/>
            </div>
            <div className="details right">
              <div className="user">Talitha Barnes</div>
              <div className="role">Admin</div>
            </div>
          </div>
        </div>
        <div className="leftBar">
          <div className="companyProfile">
            <img src="/assets/default_profile.png"/>
            <h4>Creative Living</h4>
          </div>
          <ul>
            {this.renderNav()}
          </ul>
        </div>
        <div className="mainContent">
          <Card title="Test"/>
        </div>
      </div>
    )
  }
}
