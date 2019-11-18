import React, { Component } from 'react';
import { getVehicleData } from '../api';

export default class Vehicle extends Component {

	constructor(props) {
		super(props);

		this.state = {
      isLoading: false,
    }
	}

	componentDidMount() {
    this.setState({isLoading: true});

		getVehicleData(this.props.id, (data) => {
      this.setState({
        vehicle: JSON.parse(data),
        isLoading: false,
			})
		});
  }

	render() {
    console.log(this.props);
    const { id, media } = this.props;
    const { vehicle } = this.state;

    return (
      <div className="Vehicle">
        <figure className="Vehicle__image" style={{backgroundImage: `url(https://stimg.cardekho.com/images/carexteriorimages/630x420/Land-Rover/Land-Rover-Range-Rover/5880/front-left-side-47.jpg?tr=w-420,e-sharpen)`}}></figure>
        {/* <figure className="Vehicle__image" style={{backgroundImage: `url(${media.url})`}}></figure> */}
        <div className="Vehicle__info">
          <h2 className="Vehicle__name">{id}</h2>
          <p className="Vehicle__price">{vehicle ? `From ${vehicle.price}` : '...'}</p>
          <p className="Vehicle__description">{vehicle ? vehicle.description : '...'}</p>
        </div>
      </div>
    )
	}
}