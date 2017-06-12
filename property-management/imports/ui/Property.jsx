import React, { Component, PropTypes } from 'react';

import { Properties } from '../api/Properties.js';

export default class Property extends Component {
    render () {
        return (
            <li className="property">
                <span className="text">
                    <strong>{this.props.title}</strong>
                </span>
            </li>
        );
    }
}

Property.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  property: PropTypes.object.isRequired,
};
