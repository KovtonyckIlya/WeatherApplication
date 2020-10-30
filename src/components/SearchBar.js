import React, { useState, Fragment } from "react";
import { InputGroup, FormControl, Button, Form, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { getWeather } from "../actions/weather";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const SearchBar = ({ getWeather }) => {
  const loadCurrent = async () => {
    if (navigator.geolocation) {
      return new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(
          (position) => resolve(position),
          (error) => reject(error)
        )
      );
    } else {
      alert("Browser are not supporting geolocation");
    }
  };
  
  const getCurrentLocation = async () => {
    const location = await loadCurrent();
    const lat = location.coords.latitude;
    const lon = location.coords.longitude;
    getWeather(lat, lon,"Local Weather");
  };
  
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({});

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
  };

  const handleSubmit = (e) => {
    if (address === "") {
      return;
    }
    e.preventDefault();
    getWeather(coordinates.lat, coordinates.lng, address);
    setCoordinates({});
    setAddress("");
  };

  return (
    <Fragment>
      <Col className="col-md-8 order-2 order-md-1 offset-md-2">
        <Form onSubmit={handleSubmit}>
          <InputGroup className="my-5">
            <PlacesAutocomplete
              value={address}
              onChange={setAddress}
              onSelect={handleSelect}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => {
                const inputProps = getInputProps({
                  placeholder: "City name (e.g. Kyiv)",
                });
                const onEnterKeyPressed = (e) => {
                  const suggestionsOpen = !!suggestions.length;
                  inputProps.onKeyDown(e);
                  if (!suggestionsOpen && e.keyCode === 13) {
                    getWeather(coordinates.lat, coordinates.lng, address);
                    setCoordinates({});
                  }
                };
                return (
                  <Fragment>
                    <FormControl
                      {...inputProps}
                      onKeyDown={onEnterKeyPressed}
                    />
                    <div className="search-d-down">
                      {loading ? <div>...loading</div> : null}
                      {suggestions.map((suggestion) => {
                        const style = {
                          backgroundColor: suggestion.active
                            ? "#41b6e6"
                            : "#f4f4f4",
                          margin: "2px 5px",
                        };
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, { style })}
                          >
                            {suggestion.description}
                          </div>
                        );
                      })}
                    </div>
                  </Fragment>
                );
              }}
            </PlacesAutocomplete>
            <InputGroup.Append>
              <Button  className="search-button" variant="outline-secondary" type="submit">
                Get weather
              </Button>
              <Button  variant="outline-secondary"
                onClick={getCurrentLocation}
                type="button">
                 LocalWeather
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form>
      </Col>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  weather: state.weather,
  error: state.weather.error,
});

export default connect(mapStateToProps, { getWeather })(SearchBar);
