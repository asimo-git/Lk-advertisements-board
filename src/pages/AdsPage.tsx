import { useCallback, useEffect, useState } from "react";
import { fetchAdvertisement, updateAdvertisement } from "../utils/helpers";
import { Advertisment } from "../utils/types";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import PopUp from "../components/PopUp";

export default function AdsPage() {
  const { id = "" } = useParams<{ id: string }>();

  const [advertisement, setAdvertisement] = useState<Advertisment | undefined>(
    undefined
  );
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    description: "",
    price: 0,
  });

  const loadAd = useCallback(async () => {
    setLoading(true);

    const fetchedAd = await fetchAdvertisement(id, setError);
    if (fetchedAd) {
      setAdvertisement(fetchedAd);
      setFormData({
        name: fetchedAd.name,
        imageUrl: fetchedAd.imageUrl ?? "",
        description: fetchedAd.description ?? "",
        price: fetchedAd.price,
      });
    }

    setLoading(false);
  }, [id]);

  useEffect(() => {
    void loadAd();
  }, [loadAd]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    await updateAdvertisement({ id, formData, setError });
    setLoading(false);
    void loadAd();
    setIsEditing(false);
  };

  return (
    <>
      <main>
        <Container>
          <p>Объявление №{id}</p>
          {loading ? (
            <Spinner animation="border" />
          ) : !isEditing ? (
            <div>
              <h2>{advertisement?.name}</h2>
              <img
                src={advertisement?.imageUrl}
                alt={advertisement?.name}
                style={{ maxWidth: "300px" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/default-image-url.png";
                }}
              />
              <p>Описание: {advertisement?.description}</p>
              <p>Стоимость: {advertisement?.price}</p>
              <Button onClick={() => setIsEditing(true)}>Редактировать</Button>
            </div>
          ) : (
            <Form
              onSubmit={(event) => {
                void handleSubmit(event);
              }}
            >
              <Form.Group controlId="formAdName">
                <Form.Label>Название</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formAdImage" className="mt-3">
                <Form.Label>Изображение (URL)</Form.Label>
                <Form.Control
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formAdDescription" className="mt-3">
                <Form.Label>Описание</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formAdPrice" className="mt-3">
                <Form.Label>Стоимость</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                Сохранить
              </Button>
              <Button
                variant="secondary"
                className="mt-3 ms-2"
                onClick={() => setIsEditing(false)}
              >
                Отмена
              </Button>
            </Form>
          )}
        </Container>
        <PopUp message={error} setMessage={setError}></PopUp>
      </main>
    </>
  );
}
