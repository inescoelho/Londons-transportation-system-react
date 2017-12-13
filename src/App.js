import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';
import './App.css';

import Sidebar from './components/Sidebar'
import Information from './components/Information'
import Footer from './components/Footer'

class App extends Component {
  constructor() {
    super();
    this.state = {
      services: {}, //available transportations services - to be used on the menu
      active: '', //active menu option
      disruptions: [], //disruptions relative to active option
      message: "No information to display.", //message to display on screen
    };

    this.getServices = this.getServices.bind(this);
    this.selectOption = this.selectOption.bind(this);
  }

  /*
  * Perform API call
  */
  componentDidMount() {
    this.getServices();
  }

  /*
  * API call to fetch information about available transportation services in London
  */
  getServices() {
    fetch("https://api.tfl.gov.uk/Line/Mode/tube,overground,dlr/Status?detail=true")
		.then(r => {
			return r.json();
		})
		.then(r => {
			//group objects by modeName
			return r.reduce(function(new_element, index) {
    		(new_element[index['modeName']] = new_element[index['modeName']] || []).push(index);
    			return new_element;
    		}, {});
		})
		.then(r => {
			//sort elements by modeName by putting it in array
			var sortable = [];
			for (var transport in r) {
			    sortable.push([transport, r[transport]]);
			}
			sortable.sort(function(a, b) {
				if (a[0].toUpperCase() < b[0].toUpperCase()) {
				    return -1;
				}
				if (a[0].toUpperCase() > b[0].toUpperCase()) {
				    return 1;
				}
				// names must be equal
				return 0;
			});
			return sortable;
		})
		.then(r => {
			//order objects in each modeName
			for (var i=0; i < r.length; i++) {
				r[i][1].sort(function(a, b) {
					var nameA = a.name.toUpperCase(); // ignore upper and lowercase
					var nameB = b.name.toUpperCase(); // ignore upper and lowercase
					if (nameA < nameB) {
					    return -1;
					}
					if (nameA > nameB) {
					    return 1;
					}
					// names must be equal
					return 0;
				});
			}
			return r;
		})
		.then(r => {
      this.setState({services: r});
      return;
		}),
		function (err) {
      this.setState({message: "Unable to get Transports information."});
    };
  }

  /*
  * Updates active option and respective disruptions and updates the message
  * on screen accordingly
  */
  selectOption(option, info) {
    this.setState({active: option});
    this.setState({disruptions: info});

    let numberDisruptions = info.length;
    if (numberDisruptions === 0)
      this.setState({message: "No service disruptions."});
    else
      this.setState({message: "Service currently suffering disruptions."});
  }

  /*
  * Renders the App
  */
  render() {
    return (
      <div className="App">
        <Grid>
          <Row>
            <Sidebar services={this.state.services}  select={this.selectOption} active={this.state.active}/>
            <Information active={this.state.active} message={this.state.message} disruptions={this.state.disruptions} />
          </Row>
        </Grid>
        <Footer />
      </div>
    );
  }
}

export default App;
