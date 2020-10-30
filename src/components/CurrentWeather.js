import React, { Fragment } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import WeatherIcon from "react-icons-weather";

const CurrentWeather = ({
  weather: {
    weatherData: { current, address },
    loading,
  },
}) => {
  const {
    dt,
    temp,
    feels_like,
    pressure,
    humidity,
    uvi,
    wind_speed,
    wind_deg,
    weather,
  } = current;
  const [data] = weather;
  return (
    <Fragment>
      <div className="col-12 col-md-6 text-center order   -3 order-md-3">
        <h4 className="location">
          <i className="fas fa-map-marker-alt mr-3" />
          {address}
        </h4>
        <h5 className="date">
          <Moment format="dddd D MMMM, HH:mm" unix>
            {dt}
          </Moment>
        </h5>
        <h6 className="current-weather-description text-capitalize">
          {data.description}
        </h6>
        <div className="current-weather-container my-3 d-flex justify-content-center">
          <WeatherIcon
            className="mt-2 main-weather-icon"
            name="owm"
            iconId={data.id.toString()}
          />
          <div className="temp mx-3 d-flex flex-column justify-content-center">
            <div className="current-temp">{Math.round(temp) + "°C"}</div>
            <div className="feels-like">
              <span className="font-weight-bold mr-3">Feels like</span>
              {Math.round(feels_like) + "°C"}
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-3 info-block order-4 order-md-4 d-flex flex-column justify-content-around text-center text-md-left">
        <h6 className="font-weight-bold text-center">Conditions:</h6>
        <span>{"pressure: " + pressure + "hPa"}</span>
        <span>{"humidity: " + humidity + "%"}</span>
        <span>{"uvi: " + uvi}</span>
        <span>
          {"wind: " + wind_speed + "km/h"}
          <i
            className="fas fa-long-arrow-alt-up ml-3"
            style={{ transform: `rotate(${wind_deg}deg)` }}
          ></i>
        </span>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  weather: state.weather,
  address: state.address,
});
export default connect(mapStateToProps, null)(CurrentWeather);
