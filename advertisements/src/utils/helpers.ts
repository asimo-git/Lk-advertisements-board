import { Advertisment } from "./types";

export async function fetchAdvertisements(): Promise<Advertisment[]> {
  try {
    const response = await fetch("http://localhost:3000/advertisements");
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
    }
    const advertisements = (await response.json()) as Advertisment[];
    return advertisements;
  } catch (error) {
    console.error("Ошибка при получении объявлений:", error);
    return [];
  }
}

interface AdsData {
  name: string;
  imageUrl: string;
  description: string;
  price: number;
}

export async function addNewAdvertisement({
  name,
  imageUrl,
  description,
  price,
}: AdsData): Promise<string> {
  try {
    const currentDate = new Date().toISOString();
    const bodyData: Omit<Advertisment, "id"> = {
      name: name,
      price: price,
      createdAt: currentDate,
      views: 0,
      likes: 0,
      imageUrl: imageUrl,
      description: description,
    };

    const response = await fetch("http://localhost:3000/advertisements", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(bodyData),
    });

    if (!response.ok) {
      console.error(`Ошибка: ${response.status} ${response.statusText}`);
      return "Ошибка при добавлении объявления";
    }
    return "Объявление добавлено";
  } catch (error) {
    console.error(error);
    return "Ошибка при добавлении объявления";
  }
}

export async function fetchAdvertisement(
  id: string,
  setError: (message: string) => void
): Promise<Advertisment | undefined> {
  try {
    const response = await fetch(`http://localhost:3000/advertisements/${id}`);
    if (!response.ok) {
      setError("Ошибка при получении объявления");
      console.error(`Ошибка: ${response.status} ${response.statusText}`);
    }
    const advertisement = (await response.json()) as Advertisment;
    return advertisement;
  } catch {
    setError("Ошибка при получении объявления");
  }
}

interface UpdateAdvertisementProps {
  id: string;
  formData: AdsData;
  setError: (message: string) => void;
}

export async function updateAdvertisement({
  id,
  formData,
  setError,
}: UpdateAdvertisementProps) {
  try {
    console.log(formData);
    const response = await fetch(`http://localhost:3000/advertisements/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      setError("Не удалось обновить объявление");
    }
  } catch {
    setError("Не удалось обновить объявление");
  }
}
