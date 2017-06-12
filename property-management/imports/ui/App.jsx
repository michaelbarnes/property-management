import React, { Component, PropTypes } from 'react';
import ReactDom from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '../api/Tasks.js';
import { Properties } from '../api/Properties.js';
import Task from './Task.jsx';
import AccountsUIWrapper from './AccountUIWrapper.jsx';
import Property from './Property.jsx';
import Modal from 'react-modal';


const appElement = document.getElementById('your-app-element');

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

// App component
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: true,
      modalIsOpen: false
    };

    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal = () => {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.refs.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  handlePropertySubmit(event) {
    event.preventDefault();

    const title = ReactDom.findDOMNode(this.refs.propertyTitle).value.trim();

    Properties.insert({
      title: title,
      createdAt: new Date(),
      owner: Meteor.userId(),
      createdBy: Meteor.user().username,
      visible: true
    });

  }

  // Submit new-task input
  handleTaskSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDom.findDOMNode(this.refs.taskName).value.trim();

    Tasks.insert({
      text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      createdBy: Meteor.user().username,
      check: false,
      visible: true
    });
  }

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  renderTasks() {
    let filteredTasks = this.props.tasks;
    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.check);
    }
    if(filteredTasks.count > 0) {
      return filteredTasks.map((task) => (
        <Task key={task._id} task={task} />
      ));
    }
  }

  renderProperties() {
    let propertiesList = this.props.properties;
    return propertiesList.map((property) =>
      <Property key={property._id} title={property.title} />)
  }

  log() {
    console.log('Test');
  }

  render() {
    return (
      <div className="container" >
        <header>
          <h1>Todo List ({this.props.incompleteCount})</h1>

          <label className="hide-completed">
            <input
              type="checkbox"
              readOnly
              checked={this.state.hideCompleted}
              onClick={this.toggleHideCompleted.bind(this)}
            />
            Hide Completed Tasks
          </label>

          <AccountsUIWrapper />

          { this.props.currentUser ?
            <form className="new-task" onSubmit={this.handleTaskSubmit.bind(this)} >
              <input
                type="text"
                ref="taskName"
                placeholder="Type to add new tasks"
              />
            </form> : ''
          }

          </header>
          <ul>
            {this.renderTasks()}
          </ul>
          <header>
            <h1>Properties</h1>
            <button type="button" ref="createProperty" value="add" onClick={this.openModal} >
              Add
            </button>

            <ul>
              {this.renderProperties()}
            </ul>

            <div>
              <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Example Modal"
              >

                <h2 ref="subtitle">Hello</h2>
                <button onClick={this.closeModal}>close</button>
                <form>
                  <input ref="propertyTitle"/>
                  <button onClick={this.handlePropertySubmit.bind(this)}>Save</button>
                </form>
              </Modal>
            </div>

          </header>
        </div>
    );
  }
}

App.protoTypes = {
  tasks: PropTypes.array.isRequired,
  properties: PropTypes.array.isRequired,
  incompleteCount: PropTypes.number.isRequired,
  currentUser: PropTypes.object,
};

export default createContainer(() => {
  return {
    properties: Properties.find({}, { sort: { createdAt: -1 } }).fetch(),
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Tasks.find({ check: { $ne: true } }).count(),
    currentUser: Meteor.user(),
  };
}, App);
