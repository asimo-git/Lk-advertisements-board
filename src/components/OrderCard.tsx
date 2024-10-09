import { Button, Card, Collapse } from "react-bootstrap";
import { Order, OrderStatus } from "../utils/types";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function OrderCard({ order }: { order: Order }) {
  const [openItems, setOpenItems] = useState(false);

  return (
    <Card key={order.id}>
      <Card.Body>
        <Card.Title>Заказ №{order.id}</Card.Title>
        <Card.Text> Количество товаров: {order.items.length}</Card.Text>
        <Card.Text> Время создания заказа: {order.createdAt}</Card.Text>
        <Card.Text>
          Время завершения заказа: {order.finishedAt || "Не завершен"}
        </Card.Text>
        <Card.Text> Общая стоимость заказа: {order.total}</Card.Text>
        <Card.Text> Статус: {OrderStatus[order.status]}</Card.Text>

        <Button onClick={() => setOpenItems((prevOpenItems) => !prevOpenItems)}>
          {openItems ? "Скрыть все товары" : "Показать все товары"}
        </Button>

        <Collapse in={openItems}>
          <div>
            {order.items.map((item) => (
              <Link
                key={item.id}
                to={`/ads/${item.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Card.Text key={item.id} className="mt-3">
                  {item.name} - {item.count} шт.
                </Card.Text>
              </Link>
            ))}
          </div>
        </Collapse>
      </Card.Body>
    </Card>
  );
}
