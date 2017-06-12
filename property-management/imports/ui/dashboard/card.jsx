import React, { Component } from 'react';

import Col from 'react-bootstrap/lib/Col';
import Image from 'react-bootstrap/lib/Image';
import Button from 'react-bootstrap/lib/Button';
import Thumbnail from 'react-bootstrap/lib/Thumbnail';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Grid';

export default class Card extends Component {
  render() {
    return (
      <div>
        <Grid>
          <Row>
          <Col xs={6} md={4}>
            <Thumbnail src={this.props.image} alt="242x200">
              <h3>{this.props.title}</h3>
              <ul>
                <li>
                  Task 1
                </li>
                <li>
                  Task 2
                </li>
              </ul>
              <p>
                <Button bsStyle="primary">Details</Button>
              </p>
            </Thumbnail>
          </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}
