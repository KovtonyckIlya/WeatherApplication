import React, { Fragment } from "react";
import { connect } from "react-redux";
import WeatherIcon from "react-icons-weather";
import Moment from "react-moment";

const DailyForecast = ({
  weather: {
    weatherData: { daily },
  },
}) => {
  return (
    <Fragment>
      <div className="col-12">
        <h4 className="my-3 font-weight-bold">Daily forecast</h4>
        <div className="table-responsive">
          <table>
            <tbody>
              <tr>
                {daily.map((item) => {
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
                            <Moment format="dddd D MMMM" unix>
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
                            <span className="temp-low text-primary">
                              {Math.round(temp.min) + "°C"}
                            </span>
                            <span className="temp-high text-danger">
                              {Math.round(temp.max) + "°C"}
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
                              {snow + "mm"}
                            </span>
                          )}
                          {rain && (
                            <span className="mx-auto">
                              <i className="fas fa-cloud-rain mr-3"></i>
                              {rain + "mm"}
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

export default connect(mapStateToProps, null)(DailyForecast);
