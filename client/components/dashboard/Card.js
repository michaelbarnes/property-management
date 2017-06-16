import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Meteor } from 'meteor/meteor';

export default class Card extends Component {
  constructor() {

    super();
  }

  render () {
    return (
      <div className="card">
        <div className="interior">
          <h2>{this.props.title}</h2>
          <table>
            <tr>
              <td><p>Owner: <a href="">Mr Dickface</a></p></td>
              <td><p>Renewal Date: 01 Feb 2018</p></td>
            </tr>
            <tr>
              <td><p>Tenant: <a href="">Talitha Batrnes</a></p></td>
              <td><p className="floater-right">Rental Price: R10,000</p></td>
            </tr>
          </table>
          <h3>Latest Inspections</h3>
          <table>
            <tr>
              <th>Date</th>
              <th>Parties</th>
            </tr>
            <tr>
              <td>04 April 2017</td>
              <td>Barnes Becker</td>
            </tr>
          </table>
          <h3>Maintence</h3>
            <table>
              <tr>
                <th>Description</th>
                <th>Status</th>
              </tr>
              <tr>
                <td>Leaking pipe??</td>
                <td>Awaiting owner approval</td>
              </tr>
              <tr>
                <td>Painting</td>
                <td>Appointment 2017-04-06</td>
              </tr>
            </table>
        </div>
      </div>
    )
  }
}
