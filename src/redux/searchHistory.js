import { GET_CURRENT_WEATHER } from "../actions/types";

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_CURRENT_WEATHER:
      if (
        !payload.error &&
        !state.some(
          (item) => item["lat"] === payload.lat && item["lon"] === payload.lon
        )
      ) {
        state = [payload, ...state.slice(0, 4)];
        return [...state];
      }
      return state;
    default:
      return state;
  }
}
