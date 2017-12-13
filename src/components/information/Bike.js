import React, { Component } from 'react';
import { Button} from 'react-bootstrap';

class Bike extends Component {
  constructor() {
    super();

    this.state = {
      location: [], //actual bike location
      msg: "" //error message
    }

    this.getInput = this.getInput.bind(this);
    this.getBikePoints = this.getBikePoints.bind(this);
    this.renderBikeLocations = this.renderBikeLocations.bind(this);
    this.getBikePointsFromAPI = this.getBikePointsFromAPI.bind(this);
  }

  /*
  * Add search box listeners
  */
  componentDidMount() {
    document.getElementById('search').getElementsByTagName('button')[0].addEventListener('click', () => {
      this.getBikePoints(this.getInput());
    });

    document.getElementById('search').getElementsByTagName('input')[0].addEventListener('keypress', (e) => {
      if(e.keyCode === 13) {
        this.getBikePoints(this.getInput());
      }
    });
  }

  getInput() {
    return document.getElementById('search').getElementsByTagName('input')[0].value;
  }

  /*
 * Get Bike Points from storage or thought the API
 * and display information on screen
 */
 getBikePoints(name) {
   //make sure message is erased
   this.setState({msg: ""});

  	var bikePoints = this.props.getBike(name);
  	if (bikePoints.length === 0) {
  		this.getBikePointsFromAPI(name)
      this.props.setBike(name, this.state.location);
  	}
    else {
      this.setState({location: bikePoints});
    }
  }

  /*
  * API call to fetch bike points
  */
  getBikePointsFromAPI(name) {
    fetch("https://api.tfl.gov.uk/BikePoint/Search?query=" + name)
    .then( r => {
  	   return r.json();
  	})
  	.then( r => {
  		if (r.length===0) {
        this.setState({location: []});
  			this.setState({msg: `No bike points found for ${name}`});
  		}
  		else {
        this.setState({location: r});
        this.props.setBike(name, r);
  		}
  		return;
  	}),
  	function (err) {
        this.setState({location: []});
    		this.setState({msg: `No bike points found for ${name}`});
      };
  }

  renderBikeLocations() {
    var bikeLocations = [];
    this.state.location.forEach( (loc) => {
      let bikeId = loc.id.split('_')[1];
      let bike =`${bikeId} ${loc.commonName} (${loc.lat},${loc.lon})`;

      bikeLocations.push (
        <li key={bikeId}>{bike}</li>
      )
    });
    return bikeLocations;
  }

  render() {
    return (
      <div id="bikeInformation">
        <div className="input-group" id="search">
          <input type="text" className="form-control" placeholder="Location" id="query"/>
          <span className="input-group-btn">
            <Button className="btn btn-customize">GO</Button>
          </span>
        </div>

        { !this.state.msg ?
          <ul id="bikeLocations">
            {this.renderBikeLocations()}
          </ul> :
          <p>{this.state.msg}</p>
        }



      </div>
    );
  }

  /*
  * Remove search box listeners
  */
  componentWillUnmount() {
    document.getElementById('search').getElementsByTagName('button')[0].removeEventListener('click', () => {
      this.getBikePoints(this.getInput());
    });

    document.getElementById('search').getElementsByTagName('input')[0].removeEventListener('keypress', (e) => {
      if(e.keyCode === 13) {
        this.getBikePoints(this.getInput());
      }
    });
  }

}

export default Bike;
