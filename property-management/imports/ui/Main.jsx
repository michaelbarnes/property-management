import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import Navbar from './MainNav.jsx'

export default class Main extends Component {
    render () {
        return  (
            <div>
              <Navbar />
            </div>
        )
    }
}
