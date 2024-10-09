import { useEffect, useState } from "react";
import { fetchOders } from "../utils/helpers";
import { Order, OrderStatus } from "../utils/types";
import { Container, Form, Spinner } from "react-bootstrap";
import OrdersList from "../components/OrdersList";
import PaginationBar from "../components/PaginationBar";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [statusFilter, setStatusFilter] = useState("");
  const [sortPriceOrder, setSortPriceOrder] = useState("");

  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      const response = await fetchOders({
        statusFilter,
        sortPriceOrder,
        currentPage: String(currentPage),
      });
      setOrders(response.orders);
      setTotalPages(response.totalPages ?? 1);
      setLoading(false);
    };

    void loadOrders();
  }, [statusFilter, sortPriceOrder, currentPage]);

  return (
    <>
      <main>
        <Container>
          <Form.Group className="d-flex align-items-center gap-3 my-3">
            <Form.Label>Фильтр по статусу</Form.Label>
            <Form.Select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              style={{ maxWidth: "200px" }}
            >
              <option value="">Все</option>
              {Object.values(OrderStatus)
                .filter((value) => typeof value === "string")
                .map((option, index) => (
                  <option key={index} value={index}>
                    {option}
                  </option>
                ))}
            </Form.Select>

            <Form.Label>Сортировать по:</Form.Label>
            <Form.Select
              value={sortPriceOrder}
              onChange={(event) => setSortPriceOrder(event.target.value)}
              style={{ maxWidth: "200px" }}
            >
              <option value=""></option>
              <option value="asc">Цена (по возрастанию)</option>
              <option value="desc">Цена (по убыванию)</option>
            </Form.Select>
          </Form.Group>

          <h1>Ваши заказы</h1>

          {loading ? (
            <Spinner animation="border" />
          ) : orders.length === 0 ? (
            <p>Ничего не найдено по вашему запросу</p>
          ) : (
            <>
              <OrdersList orders={orders}></OrdersList>
              <PaginationBar
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </Container>
      </main>
    </>
  );
}
