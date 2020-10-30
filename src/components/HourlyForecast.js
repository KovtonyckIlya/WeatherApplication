import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import WeatherIcon from "react-icons-weather";
import Moment from "react-moment";

const HourlyForecast = ({
  weather: {
    weatherData: { hourly },
  },
}) => {
  const [h, setHours] = useState([]);

  useEffect(() => {
    setHours(hourly);
  }, [hourly]);

  return (
    <Fragment>
      <div className="col-12">
        <h4 className="my-3 font-weight-bold d-md-inline">Hourly forecast</h4>
        <button
          onClick={() => setHours(hourly.slice(0, 12))}
          type="button"
          className="btn btn-outline-dark ml-2 btn-sm my-md-3"
        >
          12 hours
        </button>
        <button
          onClick={() => setHours(hourly.slice(0, 24))}
          type="button"
          className="btn btn-outline-dark ml-2 btn-sm my-md-3"
        >
          24 hours
        </button>
        <button
          onClick={() => setHours(hourly)}
          type="button"
          className="btn btn-outline-dark ml-2 btn-sm my-md-3"
        >
          48 hours
        </button>
        <div className="table-responsive">
          <table>
            <tbody>
              <tr>
                {h.map((item) => {
                  const {
                    dt,
                    temp,
                    wind_speed,
                    wind_deg,
                    rain,
                    snow,
                    weather,
                  } = item;
                  const [data] = weather;
                  return (
                    <td key={dt}>
                      <div className="card">
                        <span className="font-weight-bold text-center my-3">
                          {
                            <Moment format="ddd D MMMM, HH:mm" unix>
                              {dt}
                            </Moment>
                          }
                        </span>
                        <WeatherIcon
                          className="mt-2 card-weather-icon text-center"
                          name="owm"
                          iconId={data.id.toString()}
                        />
                        <div className="card-body d-flex flex-column justify-content-between font-weight-bold">
                          <div className="temp d-flex justify-content-around mb-3">
                            <span className="text-danger">
                              {Math.round(temp) + "°C"}
                            </span>
                          </div>
                          <span className="mx-auto">
                            <i className="fas fa-wind mr-3"></i>
                            {Math.round(wind_speed) + "km/h"}
                            <i
                              className="fas fa-long-arrow-alt-up ml-3"
                              style={{ transform: `rotate(${wind_deg}deg)` }}
                            ></i>
                          </span>
                          {snow && (
                            <span className="mx-auto">
                              <i className="fas fa-snowflake mr-3"></i>
                              {snow["1h"] + "mm"}
                            </span>
                          )}
                          {rain && (
                            <span className="mx-auto">
                              <i className="fas fa-cloud-rain mr-3"></i>
                              {rain["1h"] + "mm"}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  weather: state.weather,
});

export default connect(mapStateToProps, null)(HourlyForecast);
