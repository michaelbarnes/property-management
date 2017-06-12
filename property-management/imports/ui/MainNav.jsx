import React, { Component } from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavbarBrand from 'react-bootstrap/lib/NavbarBrand';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Image from 'react-bootstrap/lib/Image';
import Button from 'react-bootstrap/lib/Button';

import DashboardCard from './dashboard/Card.jsx';
import Field from './form/Field.jsx';

import Modal from 'react-bootstrap/lib/Modal';
import Popover from 'react-bootstrap/lib/Popover';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';

/* Main Navigation */
export default class MainNav extends Component {
  constructor() {

    super();
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);

    this.state = {
      showModal: false
    }
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  render () {
    return (
      <div>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Property Managment</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Col xs={12} md={2}>
          <Nav bsStyle="pills" stacked activeKey={1}>
            <NavItem eventKey={1} href="">Properties</NavItem>
            <NavItem eventKey={2} title="">Tasks</NavItem>
            <NavItem eventKey={3}>Tennants</NavItem>
            <NavItem eventKey={3}>Contractors</NavItem>
          </Nav>
        </Col>
        <Row>
          <h1>Properties</h1>
          <Button bsStyle="primary" onClick={this.open}>Add</Button>
        </Row>
        <Grid>
          <Row>
            <Col xs={6} md={4}>
              <DashboardCard title="134 Station Road" image="http://downloadicons.net/sites/default/files/small-house-symbol-icon-87787.png" />
            </Col>
            <Col xs={6} md={4}>
              <DashboardCard title="134 Station Road" image="http://downloadicons.net/sites/default/files/small-house-symbol-icon-87787.png" />
            </Col>
            <Col xs={6} md={4}>
              <DashboardCard title="134 Station Road" image="http://downloadicons.net/sites/default/files/small-house-symbol-icon-87787.png" />
            </Col>
          </Row>
        </Grid>

        <div>
          <Modal show={this.state.showModal} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title>Property</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Add a new Property</h4>
              <p>Create a new Property to Manage</p>
              <hr />

              <Field id="propertyTitle" label="Title" type="text" />
              <Field id="propertyTitle" label="Address" class="textarea" />

            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.close}>Save</Button>
              <Button onClick={this.close}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    )
  }
}
