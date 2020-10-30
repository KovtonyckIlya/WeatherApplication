import axios from "axios";
import {
  GET_CURRENT_WEATHER,
  WEATHER_ERROR,
  GET_WEATHER_FROM_HISTORY,
} from "./types";

export const getWeather = (lat, lon, address) => async (dispatch) => {
  try {
    require("dotenv").config();
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
    );
    dispatch({
      type: GET_CURRENT_WEATHER,
      payload: { ...res.data, address },
    });
  } catch (err) {
    dispatch({
      type: WEATHER_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

export const getWeatherFromHistory = (item) => async (dispatch) => {
  try {
    dispatch({
      type: GET_WEATHER_FROM_HISTORY,
      payload: item,
    });
  } catch (err) {
    dispatch({
      type: WEATHER_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
