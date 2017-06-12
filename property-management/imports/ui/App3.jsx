import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Meteor } from 'meteor/meteor';

import ContextList from './ContextList.jsx';
import ContextItem from './ContextItem.jsx';
import Card from './dashboard/Card.jsx';
import InspectionSheet from './dashboard/InspectionSheet.jsx';

import { Properties } from '../api/Properties.js';

export default class App extends Component {
  constructor() {

    super();

    this.state = {
      selectedNavItem: 0,
      createOwnerShow: false,
      createPropertyShow: false,
      inputValue: "",
      menuItemEventKey: 0,
      hideCompleted: false,
      navItems: [
        {'value': 'Properties', 'state': 'active', 'eventKey': 0},
        {'value': 'Inspections', 'state': 'notActive', 'eventKey': 1},
        {'value': 'Tennants', 'state': 'notActive', 'eventKey': 2},
        {'value': 'Contractors', 'state': 'notActive', 'eventKey': 3},
        {'value': 'Owners', 'state': 'notActive', 'eventKey': 4}
      ],
      contextItems: null
    }
  }

  renderProperties() {
    let properties = Properties.find({}, { sort: { createdAt: -1 } }).fetch();
    return properties.map((property) => (
      <div>
        <div className="card">

        </div>
      </div>
    ));
  }

  changeMenuItemEventKey(index) {
    let currentActive = 0;
    let newActive = 0;
    for (var i = 0; i < this.state.navItems.length; i++) {
      if(this.state.navItems[i]['state'] === 'active') {
        currentActive = i;
      } else if (this.state.navItems[i]['eventKey'] === index) {
        newActive = i;
      }
    }
    let navItemsArray = this.state.navItems;
    navItemsArray[currentActive]['state'] = 'notActive';
    navItemsArray[newActive]['state'] = 'active'
    this.setState({navItems: navItemsArray});
    this.setState({selectedNavItem: index});

  }

  renderNavOptions() {
    return (this.state.navItems.map(
      (nav) =>
      <div className={'navItem ' + nav.state}>
        <li onClick={() => this.changeMenuItemEventKey(nav.eventKey)}>{nav.value}</li>
      </div>
    ));
  }

  renderNavProfile() {
    return ([
      {'value': 'Profile', 'index': 0},
      {'value': 'Settings', 'index': 1}
      ].map(
      (nav) =>
      <div className="rightNavItem">
        <li onClick={() => this.changeMenuItemEventKey(nav.eventKey)}>{nav.value}</li>
      </div>
    ));
  }

  propertySelected(property) {
    if(property === null) {
      console.log('adding a new property');
    } else {
      console.log(property.title);
    }
  }

  renderContextList() {
    let properties = Properties.find({}, { sort: { createdAt: -1 } }).fetch();
    console.log(properties);
    if(properties.length === 0) {
      return (
        <div className="contextItem" onClick={this.propertySelected(null)}><p>Add</p></div>
      )
    } else {
      return properties.map((property) => (
        <div className="contextItem" onClick={this.propertySelected(property)}><p>{property.title}</p></div>
      ));
    }
  }

  renderMainContent() {
    console.log(this.state.selectedNavItem);
    if(this.state.selectedNavItem === 0) {
      return (
        <div className="outer">
          <div className="leftBar">
            <div className="barContainer">
              {this.renderContextList()}
            </div>
          </div>
          <div className="mainContent">
            <div>
              <Card title='134 STATION ROAD'/>
            </div>
            <div className="cardActions"></div>
          </div>
        </div>
      );
    } else if(this.state.selectedNavItem === 1) {
      return (
        <div className="outer">
          <div className="leftBar">
            <div className="barContainer">
              {this.renderContextList()}
            </div>
          </div>
          <div className="mainContent">
            <InspectionSheet property="" inspectionId="null"/>
          </div>
        </div>
      );
    }
  }

  render () {
    return (
      <div>
        <div id="main_nav">
          <ul>
            {this.renderNavProfile()}
          </ul>
          <div className="company">
          </div>
        </div>
        {this.renderMainContent()}
      </div>
    )
  }
}
