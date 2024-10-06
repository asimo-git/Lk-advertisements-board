import { Col, Container, Row } from "react-bootstrap";
import { Order } from "../utils/types";
import React from "react";
import OrderCard from "./OrderCard";

const OrdersList = React.memo(function OrdersList({
  orders,
}: {
  orders: Order[];
}) {
  return (
    <Container>
      <Row>
        {orders.map((order) => (
          <Col key={order.id} lg={6} className="mb-4">
            <OrderCard order={order} />
          </Col>
        ))}
      </Row>
    </Container>
  );
});

export default OrdersList;
