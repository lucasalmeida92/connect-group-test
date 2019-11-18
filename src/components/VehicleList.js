import React, { Component } from 'react';
import { getData } from '../api';
import Vehicle from './Vehicle';

export default class VehicleList extends Component {

	constructor(props) {
		super(props);

		this.state = {
      vehicles: null,
      isLoading: false,
    }
    this.renderVehicleList = this.renderVehicleList.bind(this);
	}

	componentDidMount() {
    this.setState({isLoading: true});

		getData((data) => {
      this.setState({
        vehicles: JSON.parse(data).vehicles,
        isLoading: false,
			})
		});
  }
  
  renderVehicleList() {
    if (this.state.isLoading || !this.state.vehicles)
      return (<p>Loading...</p>);

    return this.state.vehicles.map(vehicle => (
      <Vehicle key={vehicle.id} {...vehicle}/>
    ));
  }

	render() {
      console.log(this.state.vehicles);
      return (
        <div className="PageWrapper">
          <h1 className="PageTitle">Vehicles List</h1>
          <div className="VehicleList">
            {this.renderVehicleList()}
          </div>
        </div>
      )
	}
}