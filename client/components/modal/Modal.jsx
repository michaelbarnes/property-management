import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';
import Model from 'react-bootstrap/lib/Modal';
import Popover from 'react-bootstrap/lib/Popover';
import Tooltip from 'react-bootstrap/lib/Tooltip';

export default class Modal extends Component {
  constructor() {
    super();
    console.log("selected");
  }

  close() {
    this.props.setModal(false);
  }

  open() {
    this.setState({ showModal: true });
  }

  render () {

    const popover = (
      <Popover id="modal-popover" title="popover">
        very popover. such engagement
      </Popover>
    );
    const tooltip = (
      <Tooltip id="modal-tooltip">
        wow.
      </Tooltip>
    );

    return (
      <div>
        <Modal show={this.props.setModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Text in a modal</h4>
            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
            <hr />

            <h4>Overflowing text to show scroll behavior</h4>
            <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
            <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
            <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
            <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
            <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
            <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>

        <div>
          { this.state.showModal ? <Modal setModal={this.setModal}/> : null }
          <Row>

          </Row>
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
            <Button bsStyle="primary" onClick={() => this.setModal(true)}>Add</Button>
          </Row>
          <Grid>
            <Row>
              <Col xs={6} md={4}>
                <DashboardCard title="134 Station Road" cardImage="http://downloadicons.net/sites/default/files/small-house-symbol-icon-87787.png" />
              </Col>
              <Col xs={6} md={4}>
                <DashboardCard title="134 Station Road" cardImage="http://downloadicons.net/sites/default/files/small-house-symbol-icon-87787.png" />
              </Col>
              <Col xs={6} md={4}>
                <DashboardCard title="134 Station Road" cardImage="http://downloadicons.net/sites/default/files/small-house-symbol-icon-87787.png" />
              </Col>
            </Row>
          </Grid>
        </div>

      </div>
    )
  }

  render() {
    const popover = (
      <Popover id="modal-popover" title="popover">
        very popover. such engagement
      </Popover>
    );
    const tooltip = (
      <Tooltip id="modal-tooltip">
        wow.
      </Tooltip>
    );
  }
}
