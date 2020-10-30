import React, { Fragment } from "react";
import SearchBar from "./SearchBar";
import SearchHistory from "./SearchHistory";
import CurrentWeather from "./CurrentWeather";
import DailyForecast from "./DailyForecast";
import HourlyForecast from "./HourlyForecast";
import ErrorAlert from "./ErrorAlert";
import { connect } from "react-redux";
import { Container, Row } from "react-bootstrap";


const Layout = ({ weather }) => {
  const { loading, error } = weather;

  return (

    <section className="page-wrapper py-5">
      <Container>
        {error && <ErrorAlert />}
        <Row className="pb-md-3"> 
          <SearchBar />
          {!loading && (
            <Fragment>
              <CurrentWeather />
              <SearchHistory/>
            </Fragment>
          )}
        </Row>
        <Row>{!loading && <HourlyForecast />}</Row>
        <Row>{!loading && <DailyForecast />}</Row>
      </Container>
    </section>
  );
};

const mapStateToProps = (state) => ({
  weather: state.weather,
});

export default connect(mapStateToProps, null)(Layout);
