import { Col, Container, Row } from "react-bootstrap";
import { Advertisment } from "../utils/types";
import React from "react";
import AdsCard from "./AdsCard";

const AdsList = React.memo(function AdsList({
  advertisements,
}: {
  advertisements: Advertisment[];
}) {
  return (
    <Container>
      <Row>
        {advertisements.map((advertisement) => (
          <Col
            key={advertisement.id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            className="mb-4"
          >
            <AdsCard
              id={advertisement.id}
              imageUrl={advertisement.imageUrl}
              name={advertisement.name}
              price={advertisement.price}
              views={advertisement.views}
              likes={advertisement.likes}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
});

export default AdsList;
