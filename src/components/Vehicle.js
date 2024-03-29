import React, { Component } from 'react';
import { getVehicleData } from '../api';

export default class Vehicle extends Component {

	constructor(props) {
		super(props);

		this.state = {
      isLoading: false,
      isOpen: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
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

  handleClick() {
    this.setState({ isOpen: true });
    this.props.onVehicleClick(true);
  }

  handleCloseClick() {
    this.setState({ isOpen: false });
    this.props.onVehicleClick(false);
  }

	render() {
    const { id, media, modelYear } = this.props;
    const { vehicle, isOpen } = this.state;
    const wrapperClassNames = isOpen ? 'Vehicle Vehicle--open' : 'Vehicle';

    return (
      <div className={wrapperClassNames}>
        {isOpen && <span className="Vehicle__close-button" onClick={this.handleCloseClick}>x</span>}
        {/* <figure className="Vehicle__image" style={{backgroundImage: `url(https://stimg.cardekho.com/images/carexteriorimages/630x420/Land-Rover/Land-Rover-Range-Rover/5880/front-left-side-47.jpg?tr=w-420,e-sharpen)`}}></figure> */}
        <figure className="Vehicle__image" style={{backgroundImage: `url(${media[0].url})`}}></figure>
        <div className="Vehicle__info" onClick={this.handleClick}>
          <h2 className="Vehicle__name">{id}</h2>
          <p className="Vehicle__price">{vehicle ? `From ${vehicle.price}` : '...'}</p>
          <p className="Vehicle__description">{vehicle ? vehicle.description : '...'}</p>
          {isOpen && <div>
            <p>
              <span className="Vehicle__meta">{modelYear ? 'Model '+modelYear : '...'}</span>
            </p>
            <p>
              <span className="Vehicle__meta">{vehicle ? vehicle.meta.passengers+' passengers' : '...'}</span>
            </p>
          </div>}
        </div>
      </div>
    )
	}
}