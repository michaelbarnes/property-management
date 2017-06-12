import React, { Component } from 'react';
import ReactDom from 'react-dom';

import { Meteor } from 'meteor/meteor';
//
import { InspectionSheets } from '../../api/InspectionSheets.js';

import ConditionScore from './ConditionScore.jsx';

export default class InspectionSheet extends Component {
  constructor() {
    super();
  }

  renderInspectionSheetHeader() {
    return (
      <div>
        <h2>WALK THROUGH INSPECTION SHEETS</h2>
        <p>This form is to release you the tennant from the responsibility for existing damage to the premises and must be signed by the Agent/Landlord and tennant together.</p>
      </div>
    );
  }

  renderInspectionSheet(property, inspectionId) {
    if(inspectionId != "null") {
      let inspectionSheet = InspectionSheets.find({_id: inspectionId}).fetch();
      console.log(inspectionSheet);
    } else {
      console.log(inspectionId);
      console.log(property);
      return (
        <div>
          <table>
            <tr>
              <td>Date: </td>
              <td>Today</td>
            </tr>
            <tr>
              <td>Address: </td>
              <td>134 Station Road</td>
            </tr>
            <tr>
              <td>Tennant: </td>
              <td>Michael Barnes</td>
            </tr>
            <tr>
              <td>Landlord: </td>
              <td>Francois</td>
            </tr>
          </table>
          <p>Please complete the check list below. Incude both columns for the inspection sheet to be complete.</p>
          <table>
            <tr>
              <th></th>
              <th>Condition on arrival</th>
              <th>Condition on departure</th>
            </tr>
            <tr>
              <td><strong>Hallway and entrance hall</strong></td>
            </tr>
            <tr>
              <td>Safety Gate / Key</td>
              <td>
                <ConditionScore condition="condition1"/>
                <ConditionScore condition="condition2 circleSelected"/>
                <ConditionScore condition="condition3"/>
              </td>
              <td>
                <ConditionScore condition="condition1 circleSelected"/>
                <ConditionScore condition="condition2"/>
                <ConditionScore condition="condition3"/>
              </td>
            </tr>
            <tr>
              <td>Doors: Glass / Wood</td>
              <td>
                <ConditionScore condition="condition1 circleSelected"/>
                <ConditionScore condition="condition2"/>
                <ConditionScore condition="condition3"/>
              </td>
              <td>
                <ConditionScore condition="condition1 circleSelected"/>
                <ConditionScore condition="condition2"/>
                <ConditionScore condition="condition3"/>
              </td>
            </tr>
          </table>
        </div>
      );
    }
  }

  render () {
    return (
      <div className="card">
        <div className="interior">
          <div>
            {this.renderInspectionSheetHeader()}
            {this.renderInspectionSheet(this.props.property, this.props.inspectionId)}
          </div>
        </div>
      </div>
    )
  }
}
