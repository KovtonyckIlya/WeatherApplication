import React from "react";
import { Alert, Row } from "react-bootstrap";

const ErrorAlert = () => {
  return (
    <Row>
      <div className="col-8 offset-md-2">
        <Alert variant="danger"> City not found, please try again</Alert>
      </div>
    </Row>
  );
};

export default ErrorAlert;
