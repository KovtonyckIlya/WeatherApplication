import {
  GET_CURRENT_WEATHER,
  WEATHER_ERROR,
  GET_WEATHER_FROM_HISTORY,
} from "../actions/types";

const initialState = {
  weatherData: {},
  loading: true,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_CURRENT_WEATHER:
      return {
        ...state,
        weatherData: payload,
        loading: false,
        error: null,
      };
    case GET_WEATHER_FROM_HISTORY:
      return {
        ...state,
        weatherData: payload,
      };
    case WEATHER_ERROR:
      return {
        ...state,
        error: payload,
        loading: true,
      };

    default:
      return state;
  }
}
