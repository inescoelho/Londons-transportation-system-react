import React, { Component } from 'react';
import { Col, Row, } from 'react-bootstrap';

import Bike from './information/Bike';
import Line from './information/Line';

class Information extends Component {
  constructor() {
    super();

    this.state = {
      storedLocations: {} //searched bike locations on session
    }

    this.getBikeLocation = this.getBikeLocation.bind(this);
    this.setBikeLocation = this.setBikeLocation.bind(this);
  }

  /*
  * Get bike location from memory
  */
  getBikeLocation(name) {
    if(name in this.state.storedLocations) {
      this.setState({bike: this.state.storedLocations[name]});
      return this.state.storedLocations[name];
    }
    else {
      return [];
    }
  }

  /*
  * Add bike location to memory
  */
  setBikeLocation(name, loc) {
    var bikeLocations = this.state.storedLocations;
    bikeLocations[name] = loc;
    this.setState({storedLocations: bikeLocations});
  }

  render() {
    return (
      <Col sm={9} smOffset={3}>

          <Row>
            <Col sm={8} smOffset={2}>
              <div id="informationContainer">
                <h1><strong>Transit Information</strong></h1>
                <hr />
                {this.props.active === "bike" ?
                  <Bike getBike={this.getBikeLocation} setBike={this.setBikeLocation}/> :
                  <Line message={this.props.message} disruptions={this.props.disruptions}/>
                }
              </div>
            </Col>
          </Row>

      </Col>
    );
  }
}

export default Information;
