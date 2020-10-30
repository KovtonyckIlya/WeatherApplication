import { combineReducers } from "redux";
import weather from "./weather";
import searchHistory from "./searchHistory";

export default combineReducers({
  weather,
  searchHistory,
});
