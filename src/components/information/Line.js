import React, { Component } from 'react';

class Line extends Component {
  constructor() {
    super();

    this.renderDisruptions = this.renderDisruptions.bind(this);
  }

  renderDisruptions() {
    var disruptions = [];
    this.props.disruptions.forEach( (disrpt) => {
      disruptions.push (
        <li key={disrpt.id}>{disrpt.reason}</li>
      )
    });
    return disruptions;
  }

  render() {
    return (
      <div id="lineInformation">
        <h2>{this.props.message}</h2>
        <ul id="disruptioninformation">
          {this.renderDisruptions()}
        </ul>
      </div>
    );
  }
}

export default Line;
