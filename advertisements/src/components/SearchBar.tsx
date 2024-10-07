import { Form } from "react-bootstrap";

interface SearchBarProps {
  adsPerPage: string;
  setAdsPerPage: (count: string) => void;
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar({
  adsPerPage,
  setAdsPerPage,
  searchTerm,
  onSearchChange,
}: SearchBarProps) {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAdsPerPage(event.target.value);
  };

  return (
    <Form.Group
      controlId="adsControls"
      className="mb-3 d-flex justify-content-between"
    >
      <Form.Control
        type="text"
        placeholder="Поиск по названию..."
        value={searchTerm}
        onChange={onSearchChange}
        style={{ maxWidth: "300px" }}
      />

      <Form.Select
        value={adsPerPage}
        onChange={handleSelectChange}
        style={{ maxWidth: "200px" }}
      >
        <option value="10">10 объявлений на страницу</option>
        <option value="20">20 объявлений на страницу</option>
        <option value="50">50 объявлений на страницу</option>
      </Form.Select>
    </Form.Group>
  );
}
