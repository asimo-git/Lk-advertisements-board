import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { addNewAdvertisement } from "../utils/helpers";
import PopUp from "./PopUp";

export default function ModalAddNewAds({
  reloadAds,
}: {
  reloadAds: () => Promise<void>;
}) {
  const [showModal, setShowModal] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = {
      name: (form.elements.namedItem("adTitle") as HTMLInputElement).value,
      imageUrl: (form.elements.namedItem("adImage") as HTMLInputElement).value,
      description: (
        form.elements.namedItem("adDescription") as HTMLInputElement
      ).value,
      price: +(form.elements.namedItem("adPrice") as HTMLInputElement).value,
    };

    const response = await addNewAdvertisement(formData);

    void reloadAds();

    setShowModal(false);
    setResponseMessage(response);
  };

  return (
    <>
      <Button
        variant="outline-info"
        className="mb-2"
        onClick={() => {
          setShowModal(true);
        }}
      >
        Добавить новое объявление
      </Button>
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Добавить новое объявление</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(event) => {
              void handleSubmit(event);
            }}
          >
            <Form.Group controlId="formAdTitle">
              <Form.Label>Название</Form.Label>
              <Form.Control
                name="adTitle"
                type="text"
                placeholder="Введите название объявления"
                required
              />
            </Form.Group>
            <Form.Group controlId="formAdTitle">
              <Form.Label>Изображение</Form.Label>
              <Form.Control
                name="adImage"
                type="text"
                placeholder="Введите url"
              />
            </Form.Group>
            <Form.Group controlId="formAdDescription" className="mt-3">
              <Form.Label>Описание</Form.Label>
              <Form.Control
                name="adDescription"
                as="textarea"
                rows={3}
                placeholder="Введите описание"
              />
            </Form.Group>
            <Form.Group controlId="formAdPrice" className="mt-3">
              <Form.Label>Стоимость</Form.Label>
              <Form.Control
                name="adPrice"
                type="number"
                placeholder="Введите стоимость"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Добавить
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <PopUp message={responseMessage} setMessage={setResponseMessage}></PopUp>
    </>
  );
}
