import { Advertisment } from "./types";

export async function fetchAdvertisements(): Promise<Advertisment[]> {
  try {
    const response = await fetch("http://localhost:3000/advertisements");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const advertisements = (await response.json()) as Advertisment[];
    return advertisements;
  } catch (error) {
    console.error("Ошибка при получении объявлений:", error);
    return [];
  }
}
