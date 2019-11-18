import React, { Component } from 'react';
import { getData } from '../api';
import Vehicle from './Vehicle';

export default class VehicleList extends Component {

	constructor(props) {
		super(props);

		this.state = {
      vehicles: null,
      isLoading: false,
      hasVehicleOpen: false,
    }
    this.renderVehicleList = this.renderVehicleList.bind(this);
    this.handleVehicleClick = this.handleVehicleClick.bind(this);
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

  handleVehicleClick(isOpen) {
    this.setState({ hasVehicleOpen: isOpen });
  }
  
  renderVehicleList() {
    if (this.state.isLoading || !this.state.vehicles)
      return (<p>Loading...</p>);

    return this.state.vehicles.map(vehicle => (
      <Vehicle key={vehicle.id} onVehicleClick={this.handleVehicleClick} {...vehicle}/>
    ));
  }

	render() {
    const listClassNames = this.state.hasVehicleOpen ? 'VehicleList VehicleList--open' : 'VehicleList';

    return (
      <div className="PageWrapper">
        <h1 className="PageTitle">Vehicles List</h1>
        <div className={listClassNames}>
          {this.renderVehicleList()}
        </div>
      </div>
    )
	}
}