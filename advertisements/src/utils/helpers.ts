import { API_ENDPOINTS, Endpoint } from "./constants";
import { Advertisment, Order } from "./types";

interface PropsFetchItems {
  searchValue?: string;
  priceFilter?: [string, string];
  likesFilter?: [string, string];
  statusFilter?: string;
  currentPage: string;
  perPage?: string;
  sortPriceOrder?: string;
}

interface JsonServerResponse {
  pages: number;
  data: Advertisment[] | Order[];
}

function makeSearchParams({
  searchValue,
  priceFilter,
  likesFilter,
  statusFilter,
  currentPage,
  perPage = "10",
  sortPriceOrder,
}: PropsFetchItems): string {
  const params = new URLSearchParams();

  if (searchValue) {
    params.append("name", searchValue);
  }
  if (priceFilter) {
    params.append("price_gte", priceFilter[0]);
    params.append("price_lte", priceFilter[1]);
  }
  if (likesFilter) {
    params.append("likes_gte", likesFilter[0]);
    params.append("likes_lte", likesFilter[1]);
  }
  if (statusFilter) {
    params.append("status", statusFilter);
  }
  if (sortPriceOrder) {
    params.append("_sort", "total");
  }

  if (currentPage) {
    params.append("_page", currentPage);
  }
  if (perPage) {
    params.append("_per_page", perPage);
  }

  return params.toString();
}

interface FetchResponse {
  advertisements: Advertisment[];
  orders: Order[];
  totalPages: number | null;
}

async function fetchData<T>({
  endpoint,
  params,
}: {
  endpoint: Endpoint;
  params: string;
}): Promise<{ data: T; totalPages: number | null }> {
  try {
    const response = await fetch(`http://localhost:3000/${endpoint}?${params}`);

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const responseData = (await response.json()) as JsonServerResponse;
    const totalPages = responseData.pages ?? null;
    const data = responseData.data as T;

    return { data, totalPages };
  } catch (error) {
    console.error(`Ошибка при получении данных с ${endpoint}:`, error);
    return { data: [] as unknown as T, totalPages: null };
  }
}

export async function fetchAdvertisements({
  searchValue,
  priceFilter,
  likesFilter,
  currentPage,
  perPage,
}: PropsFetchItems): Promise<Omit<FetchResponse, "orders">> {
  try {
    const params = makeSearchParams({
      searchValue,
      priceFilter,
      likesFilter,
      currentPage,
      perPage,
    });

    const { data, totalPages } = await fetchData<Advertisment[]>({
      endpoint: API_ENDPOINTS.advertisements,
      params,
    });

    return { advertisements: data, totalPages };
  } catch (error) {
    console.error("Ошибка при получении объявлений:", error);
    return { advertisements: [], totalPages: null };
  }
}

export async function fetchOders({
  statusFilter,
  sortPriceOrder,
  currentPage,
}: PropsFetchItems): Promise<Omit<FetchResponse, "advertisements">> {
  try {
    const params = makeSearchParams({
      statusFilter,
      sortPriceOrder,
      currentPage,
    });

    const { data, totalPages } = await fetchData<Order[]>({
      endpoint: API_ENDPOINTS.orders,
      params,
    });

    // manual sorting on the client side due to the lack of sort order settings on the Jason-server
    const sortedOrders = sortPriceOrder
      ? data.sort((a, b) => {
          if (sortPriceOrder === "asc") {
            return a.total > b.total ? 1 : -1;
          } else {
            return a.total < b.total ? 1 : -1;
          }
        })
      : data;
    /////////////////////////////////////////
    return { orders: sortedOrders, totalPages };
  } catch (error) {
    console.error("Ошибка при получении объявлений:", error);
    return { orders: [], totalPages: null };
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
