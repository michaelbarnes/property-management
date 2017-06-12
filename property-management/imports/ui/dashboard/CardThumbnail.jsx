import React, { Component } from 'react';
import ReactDom from 'react-dom';

import Col from 'react-bootstrap/lib/Col';
import Image from 'react-bootstrap/lib/Image';
import Button from 'react-bootstrap/lib/Button';
import Thumbnail from 'react-bootstrap/lib/Thumbnail';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Table from 'react-bootstrap/lib/Table'
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Modal from 'react-bootstrap/lib/Modal'
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Form from 'react-bootstrap/lib/Form';


import { PropertyItems } from '../../api/PropertyItems.js';
import { Inspections } from '../../api/Inspections.js';

export default class CardThumbnail extends Component {

  constructor() {
    super();

    this.openDetails = this.openDetails.bind(this);
    this.closeDetails = this.closeDetails.bind(this);
    this.goBack = this.goBack.bind(this);
    this.switchLayout = this.switchLayout.bind(this);
    this.addPropertyItem = this.addPropertyItem.bind(this);
    this.addInspection = this.addInspection.bind(this);
    this.renderInspectionItems = this.renderInspectionItems.bind(this);
    this.submitInspections = this.submitInspections.bind(this);
    this.renderInspections = this.renderInspections.bind(this);
    //this.submitInspection = this.submitInspection.bind(this);

    this.state = {
      inventoryItems: null,
      inspectionItems: null,
      hide: false,
      showDetailModal: false,
      showInspectionForm: false,
      layoutEventKey: 0,
    }
  }

  goBack() {
    this.setState({showInspectionForm: false});
  }

  switchLayout() {
    this.setState( {showInspectionForm: true} );
  }

  closeDetails() {
    this.setState({ showDetailModal: false, showInspectionForm: false });
  }

  openDetails() {
    this.setState({showDetailModal: true});
  }

  switchInspectionFormState() {
    this.setState({showInspectionForm: true})
  }

  addInspection(event) {
    event.preventDefault();

    const description = ReactDom.findDOMNode(this.refs.description).value.trim();
    const note = ReactDom.findDOMNode(this.refs.note).value.trim();

    if(this.state.inspectionItems == null) {
      this.state.inspectionItems = [
        {
          "description": description,
          "notes": note,
          "checkByAgent": false,
          "checkByTennant": false,
          "agentCheckDate": null,
          "tennantCheckDate": null,
          "createdAt": new Date()
        }
      ];
    } else {
      this.state.inspectionItems.push({
        "description": description,
        "notes": note,
        "checkByAgent": false,
        "checkByTennant": false,
        "agentCheckDate": null,
        "tennantCheckDate": null,
        "createdAt": new Date(),
      });
    }
    //console.log(this.state.inspectionItems);
    //this.setState({descriptionField: "", noteField: ""});
  }

  addPropertyItem(event) {
    event.preventDefault();

    const item = ReactDom.findDOMNode(this.refs.item).value.trim();

    PropertyItems.insert({
      item_name: item,
      property_id: this.props.property._id,
      createdAt: new Date(),
      condition: 5,
      deleted: false,
      visible: true
    });
  }

  renderItems() {
    let items = PropertyItems.find({ property_id: this.props.property._id }, { sort: { createdAt: -1 } }).fetch();
    return items.map((item) => (
      <tr>
        <td>{item.item_name}</td>
        <td>{item.condition}</td>
      </tr>
    ));
  }

  renderInspectionItems() {
    if(this.state.inspectionItems == null) {
      return (
        <p>No Items added yet</p>
      );
    } else if(this.state.inspectionItems.count > 0) {
      return this.state.inspectionItems.map((item) => (
        <ListGroupItem>{item.description}</ListGroupItem>
      ));
    }
  }

  renderTennant() {
    if(this.props.property.tennant_id == null) {
      return (
        <p>No tennants at the moment</p>
      );
    } else {
      return (
        <p>this.props.property.owner.name</p>
      );
    }
  }

  renderInspections() {
    let inspections = Inspections.find({$and: [{property_id: this.props.property._id},{tennant_id: this.props.property.tennant_id}]}, { sort: { createdAt: -1 }}).fetch();
    console.log(inspections);
    if(inspections !== null) {
      return inspections.map((inspection) => (
        <ListGroupItem>daw</ListGroupItem>
      ));
    } else {
      return(
        <p>....</p>
      );
    }
  }

  submitInspections(event) {

    event.preventDefault();
    console.log(this.state.inspectionItems);
    if(this.state.inspectionItems != null && this.state.inspectionItems.count > 0) {
      return (
        <p>Please add some inspection items before submitting.</p>
      );
    } else {
      Inspections.insert({
        property_id: this.props.property._id,
        tennant_id: this.props.property.tennant_id,
        inspection_items: this.state.inspectionItems,
        completed: false,
        createdAt: new Date(),
        deleted: false,
        visible: true
      });

      this.setState({showInspectionForm: false});
    }
  }

  renderModalContent() {
    if(!this.state.showInspectionForm) {
      return (
        <div>
          <h3>Tennant</h3>
          {this.renderTennant()}
          <h3>Inventory</h3>
          <Form inline>
            <FormGroup controlId="title">
              <ControlLabel>New Inventory Item</ControlLabel>
              <FormControl componentClass="input" ref="item"/>
              <Button bsClass="btn btn-success" onClick={this.addPropertyItem}>Add</Button>
            </FormGroup>
          </Form>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Condition</th>
              </tr>
            </thead>
            <tbody>
              {this.renderItems()}
            </tbody>
          </Table>
          <h3>Inspections</h3>
          <ListGroup>
            {this.renderInspections()}
          </ListGroup>
          <FormGroup controlId="title">
            <ControlLabel>Create a new inspection sheet</ControlLabel>
            <Button bsClass="btn btn-success" onClick={this.switchLayout}>Add</Button>
          </FormGroup>
        </div>
      );
    } else {
      return(
        <div>
          <h4>Add a new Property</h4>
          <hr/>
          <Form inline>
            <FormGroup controlId="itemName">
              <ControlLabel>Description</ControlLabel>
              <FormControl componentClass="input" ref="description"/>
            </FormGroup>
            <FormGroup controlId="note">
              <ControlLabel>Notes</ControlLabel>
              <FormControl componentClass="input" ref="note"/>
            </FormGroup>
            <Button bsClass="btn btn-success" onClick={this.addInspection.bind(this)}>Add</Button>
          </Form>
          <ListGroup>

          </ListGroup>
          <Button bsClass="btn btn-success" onClick={this.submitInspections.bind(this)}>Done</Button>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <Grid>
          <Col xs={6} md={4}>
            <Thumbnail alt="242x200">
              <h3>{this.props.property.title}</h3>
              <p>
                <Button id="cardButton" bsStyle="primary" onClick={this.openDetails}>Details</Button>
              </p>
            </Thumbnail>
          </Col>
        </Grid>
        <div>
          <Modal show={this.state.showDetailModal} bsSize="large" onHide={this.closeDetails}>
            <Modal.Header closeButton>
              <Modal.Title>{this.props.property.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {this.renderModalContent()}
            </Modal.Body>
            <Modal.Footer>
              <Button bsClass="btn btn-success" onClick={this.goBack.bind(this)}>Go Back</Button>
              <Button onClick={this.closeDetails.bind(this)}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    )
  }
}
