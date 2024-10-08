export const API_ENDPOINTS = {
  advertisements: "advertisements",
  orders: "orders",
};

export type Endpoint = (typeof API_ENDPOINTS)[keyof typeof API_ENDPOINTS];
