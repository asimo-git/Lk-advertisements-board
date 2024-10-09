import { useState } from "react";
import { Button, Form } from "react-bootstrap";

interface FilterBarProps {
  setFilter: (priceFilter: [string, string]) => void;
}

export default function MinMaxFilter({ setFilter }: FilterBarProps) {
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");

  // объединение этих хэндлеров в один поможет избежать дублирования кода, но ухудшит читаемость и потребует введения дополнительных флагов
  // так что я склоняюсь к такому варианту

  const handleMinChange = (event: React.FocusEvent) => {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    const validValue =
      !value || maxValue === "" || +value <= +maxValue
        ? value
        : String(maxValue);

    input.value = validValue;
    setMinValue(validValue);
  };

  const handleMaxChange = (event: React.FocusEvent) => {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    const validValue =
      !value || minValue === "" || +value >= +minValue
        ? value
        : String(minValue);

    input.value = validValue;
    setMaxValue(validValue);
  };

  return (
    <Form.Group className="mb-3 d-flex gap-2">
      <Form.Label>Oт</Form.Label>
      <Form.Control
        type="number"
        placeholder="Мин"
        defaultValue={""}
        onBlur={(event) => handleMinChange(event)}
        min={0}
        className="w-25"
      />
      <Form.Label>До</Form.Label>
      <Form.Control
        type="number"
        placeholder="Макс"
        defaultValue={""}
        onBlur={(event) => handleMaxChange(event)}
        min={0}
        className="w-25"
      />
      <Button onClick={() => setFilter([String(minValue), String(maxValue)])}>
        Применить
      </Button>
    </Form.Group>
  );
}
