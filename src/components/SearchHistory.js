import React from "react";
import { connect } from "react-redux";
import { getWeatherFromHistory } from "../actions/weather";


const SearchHistory = ({ searchHistory, getWeatherFromHistory }) => {
  return (
    <div className="col-12 col-md-3 info-block order-1 order-md-2 mb-3 mb-md-0 pt-2 d-flex flex-column text-center text-md-left">
      <h6 className="font-weight-bold text-center">History:</h6>
      {searchHistory.map((item, i) => {
        return (
          
          
          <span
            className="history-item"
            onClick={() => {
              getWeatherFromHistory(item);
            }}
            key={i}
          >
            {item.address.split(",")[0]}
          </span>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => ({
  searchHistory: state.searchHistory,
});

export default connect(mapStateToProps, { getWeatherFromHistory })(
  SearchHistory
);
