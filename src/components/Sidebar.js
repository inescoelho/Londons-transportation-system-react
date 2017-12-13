import React, { Component } from 'react';
import { Col, ButtonGroup, Button } from 'react-bootstrap';
import "font-awesome/css/font-awesome.css";

class Sidebar extends Component {
  constructor() {
    super();

    this.rendermenu = this.rendermenu.bind(this);
    this.isEmpty = this.isEmpty.bind(this);
    this.checkServiceType = this.checkServiceType.bind(this);
    this.checkDisruptions = this.checkDisruptions.bind(this);
  }

  /*
  * Render menu options on side bar, when available
  */
  rendermenu() {
    if(this.isEmpty(this.props.services))
      return;

    var menuOptions = [];
    this.props.services.forEach( (serviceType) => {
      serviceType[1].forEach( (service) => {
        let disruptions = service.lineStatuses.filter(this.checkDisruptions);
        menuOptions.push (
          <Button bsStyle="link" key={service.name} onClick={() => this.props.select(service.name, disruptions)} className={service.name=== this.props.active ? 'selected' : ''}>
            {service.name} &nbsp;
            {service.serviceTypes.filter(this.checkServiceType).length > 0 ? <i className='fa fa-moon-o' aria-hidden='true'></i> : ""}
            {disruptions.length > 0 ? <i className='fa fa-exclamation-triangle' aria-hidden='true'></i> : ""}
          </Button>
        )
      });
    });

    return menuOptions;
  }

  /*
  * Check if object is empty
  */
  isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }

  checkServiceType(service) {
  	return service.name === "Night";
  }

  checkDisruptions(lineStatuses) {
  	return lineStatuses.statusSeverity !== 10;
  }

  /*
  * Rends sidebar object
  */
  render() {
    return (
      <Col sm={3} className="sidebar">
        <ButtonGroup vertical id="menu">
          {this.rendermenu()}
          <Button bsStyle="link" key="bike" onClick={() => this.props.select("bike", [])} className={ "bike" === this.props.active ? 'selected' : ''}>Cycle Hire</Button>
        </ButtonGroup>
      </Col>
    );
  }
}

export default Sidebar;
