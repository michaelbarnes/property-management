import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import Navbar from 'react-bootstrap/lib/Navbar';
import NavbarBrand from 'react-bootstrap/lib/NavbarBrand';
import Nav from 'react-bootstrap/lib/Nav';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import NavItem from 'react-bootstrap/lib/NavItem';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Image from 'react-bootstrap/lib/Image';
import Button from 'react-bootstrap/lib/Button';

import CardThumbnail from './dashboard/CardThumbnail.jsx';
import Field from './form/Field.jsx';
import Task from './Task.jsx';
import Modal from 'react-bootstrap/lib/Modal';
import Popover from 'react-bootstrap/lib/Popover';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';

import ContextList from './ContextList.jsx';
import ContextItem from './ContextItem.jsx';

import { Properties } from '../api/Properties.js';
import { Tasks } from '../api/Tasks.js';
import { Owners } from '../api/Owners.js';

/* Main Navigation */
export default class App extends Component {
  constructor() {

    super();

    /* Proerty Methods*/
    this.openPropertyModal = this.openPropertyModal.bind(this);
    this.closePropertyModal = this.closePropertyModal.bind(this);
    this.handleSubmitPropertyCreate = this.handleSubmitPropertyCreate.bind(this);

    /* Owner Methods*/
    this.openOwnerModal = this.openOwnerModal.bind(this);
    this.closeOwnerModal = this.closeOwnerModal.bind(this);
    this.handleSubmitOwnerCreate = this.handleSubmitOwnerCreate.bind(this);

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

  closePropertyModal() {
    this.setState({ createPropertyShow: false });
  }

  openPropertyModal() {
    this.setState({ createPropertyShow: true });
  }

  closeOwnerModal() {
    this.setState({ createOwnerShow: false });
  }

  openOwnerModal(index) {
    this.setState({ createOwnerShow: index });
  }

  renderDashboard() {
    if(this.state.selectedNavItem == 0) {
      return (
        <div>
          <div className="leftBar">
            <Button bsStyle="primary" onClick={this.openPropertyModal}>Add</Button>
          </div>
          <div className="mainContent">
            {this.renderProperties()}
          </div>
        </div>
      )
    } else if (this.state.selectedNavItem == 1) {
      return(
        <Row>
          <h1>Tasks</h1>
          <Button bsStyle="primary" onClick={this.openPropertyModal}>Add</Button>
          <Grid>
            <Row>
              {this.renderTasks()}
            </Row>
          </Grid>
        </Row>
      )
    } else if (this.state.selectedNavItem == 2) {
      return(
        <Row>
          <h1>Tennants</h1>
          <Button bsStyle="primary" onClick={this.openPropertyModal}>Add</Button>
          <Grid>
            <Row>

            </Row>
          </Grid>
        </Row>
      )
    } else if (this.state.selectedNavItem == 3) {
      return(
        <Row>
          <h1>Contractors</h1>
          <Button bsStyle="primary" onClick={this.open}>Add</Button>
          <Grid>
            <Row>

            </Row>
          </Grid>
        </Row>
      )
    } else if (this.state.selectedNavItem == 4) {
      return(
        <Row>
          <h1>Property Owners</h1>
          <Button bsStyle="primary" onClick={this.openOwnerModal}>Add</Button>
          <Grid>
            <Row>
              {this.renderOwners()}
            </Row>
          </Grid>
        </Row>
      )
    }
  }

  renderProperties() {
    let properties = Properties.find({}, { sort: { createdAt: -1 } }).fetch();
    return properties.map((property) => (
      <div>
        <div className="card">

        </div>
        <Col key={property._id} xs={6} md={4}>
          <CardThumbnail key={property._id} property={property} image="http://downloadicons.net/sites/default/files/small-house-symbol-icon-87787.png" />
        </Col>
      </div>

    ));
  }

  renderOwners() {
    let owners = Owners.find({}, { sort: { createdAt: -1 } }).fetch();
    if(owners.count == 0 || owners == null) {
      return(
        <Col key={property._id} xs={6} md={4}>
          <h2>No Owners found</h2>
          <p>Add a new owner to get started</p>
        </Col>
      );
    } else {
      return owners.map((owner) => (
        <div>

          <Col key={owner._id} xs={6} md={4}>
            <CardThumbnail key={owner._id} property={owner} image="http://downloadicons.net/sites/default/files/small-house-symbol-icon-87787.png" />
          </Col>
        </div>
      ));
    }
  }

  renderTasks() {
    let tasks = Tasks.find({}, { sort: { createdAt: -1 } }).fetch();
    if(tasks.count == 0) {
      <Col key={tasks._id} xs={6} md={4}>
        <h2>No Tasks found, its about time you add one.</h2>
      </Col>
    } else {
      return tasks.map((task) => (
        <Col xs={6} md={4}>
          <Task key={task._id} task={task} />
        </Col>
      ));
    }
  }

  getOwners() {
    let owners = Owners.find({}, { sort: { createdAt: -1 } }).fetch();
    return owners.map((owner) => (
      <option key={owner._id} value={owner._id}>{owner.firstname} {owner.surname}</option>
    ));
  }

  handleSubmitPropertyCreate(event) {
    event.preventDefault();

    const title = ReactDom.findDOMNode(this.refs.title).value.trim();
    const address = ReactDom.findDOMNode(this.refs.address).value.trim();
    const ownerId = ReactDom.findDOMNode(this.refs.owner_id).value;

    console.log(ownerId);
    if(title != null){
      Properties.insert({
        title: title,
        createdAt: new Date(),
        address: address,
        property_owner: ownerId,
        tennant_id: null,
        //createdBy: Meteor.user().username,
        deleted: false,
        visible: true
      });
    }

    this.setState({ createPropertyShow: false });
  }

  handleSubmitOwnerCreate(event) {
    event.preventDefault();

    const firstname = ReactDom.findDOMNode(this.refs.firstname).value.trim();
    const surname = ReactDom.findDOMNode(this.refs.surname).value.trim();
    const address = ReactDom.findDOMNode(this.refs.address).value.trim();
    const contactNumner = ReactDom.findDOMNode(this.refs.contactNumner).value.trim();
    const email = ReactDom.findDOMNode(this.refs.email).value.trim();

    Owners.insert({
      firstname: firstname,
      surname: surname,
      address: address,
      contactNumner: contactNumner,
      email: email,
      createdAt: new Date(),
      //owner: Meteor.userId(),
      //createdBy: Meteor.user().username,
      deleted: false,
      visible: true
    });

    this.setState({ createPropertyShow: false });
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
    this.setState(
      {navItems: navItemsArray},
      {selectedNavItem: index}
    )
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

  renderContextList() {
    if(this.state.selectedNavItem == 0) {
      let properties = Properties.find({}, { sort: { createdAt: -1 } }).fetch();
      return (properties.map((property) =>
        <ContextItem value={properties.title}></ContextItem>
      ));
    }
  }

  renderMainContent() {
    return (
      <div>
        <div className="leftBar">
          <ul>
            {this.renderContextList()}
          </ul>
        </div>
        <div className="mainContent">
          {this.renderProperties()}
        </div>
      </div>
    );
  }

  render () {
    return (
      <div>
        <div id="main_nav">
          <ul>
            {this.renderNavProfile()}
          </ul>
          <ul>
            {this.renderNavOptions()}
          </ul>
        </div>
        {this.renderMainContent()}
      </div>
    )
  }
}
/*
<Col xs={6} md={2}>
  <Row>
    <Col xs={6} md={2}>
      <Nav>
        {this.renderProfile()}
      </Nav>
    </Col>
  </Row>
  <Row>
    <Col xs={6} md={3}>
      <Nav bsStyle="pills" stacked activeKey={this.state.menuItemEventKey}>
        {this.renderNav()}
      </Nav>
    </Col>
  </Row>
</Col>
<Col xs={6} md={2}>
  {this.renderDashboard()}
</Col>
  <div>
    <Modal show={this.state.createPropertyShow} onHide={this.closePropertyModal}>
      <Modal.Header closeButton>
        <Modal.Title>Property</Modal.Title>
      </Modal.Header>
      <form>
        <Modal.Body>
          <h4>Add a new Property</h4>
          <p>Create a new Property to Manage</p>
          <hr />
          <FormGroup controlId="title">
            <ControlLabel>Title</ControlLabel>
            <FormControl componentClass="input" ref="title"/>
          </FormGroup>
          <FormGroup controlId="address">
            <ControlLabel>Address</ControlLabel>
            <FormControl componentClass="textarea" ref="address"/>
          </FormGroup>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Owner</ControlLabel>
            <FormControl componentClass="select" placeholder="select" ref="owner_id">
              {this.getOwners()}
            </FormControl>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button bsClass="btn btn-success" onClick={this.handleSubmitPropertyCreate.bind(this)}>Save</Button>
          <Button onClick={this.closePropertyModal}>Close</Button>
        </Modal.Footer>
      </form>
    </Modal>

    <Modal show={this.state.createOwnerShow} onHide={this.closeOwnerModal}>
      <Modal.Header closeButton>
        <Modal.Title>Owner</Modal.Title>
      </Modal.Header>
      <form>
        <Modal.Body>
          <h4>Add a new Owner</h4>
          <p>Create a new Owner to Manage</p>
          <hr />
          <FormGroup controlId="firstname">
            <ControlLabel>First Name</ControlLabel>
            <FormControl componentClass="input" ref="firstname"/>
          </FormGroup>
          <FormGroup controlId="surname">
            <ControlLabel>Surname</ControlLabel>
            <FormControl componentClass="input" ref="surname"/>
          </FormGroup>
          <FormGroup controlId="contactNumner">
            <ControlLabel>Contact Number</ControlLabel>
            <FormControl componentClass="input" type="number" ref="contactNumner"/>
          </FormGroup>
          <FormGroup controlId="email">
            <ControlLabel>Email</ControlLabel>
            <FormControl componentClass="input" type="email" ref="email"/>
          </FormGroup>
          <FormGroup controlId="address">
            <ControlLabel>Address</ControlLabel>
            <FormControl componentClass="textarea" ref="address"/>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button bsClass="btn btn-success" onClick={this.handleSubmitOwnerCreate.bind(this)}>Save</Button>
          <Button onClick={this.closeOwnerModal}>Close</Button>
        </Modal.Footer>
      </form>
    </Modal>
  </div>*/
