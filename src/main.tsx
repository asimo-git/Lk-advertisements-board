import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AllAdsPage from "./pages/AllAdsPage.tsx";
import AdsPage from "./pages/AdsPage.tsx";
import OrdersPage from "./pages/OrdersPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <AllAdsPage />,
      },
      {
        path: "/ads/:id",
        element: <AdsPage />,
      },
      {
        path: "/orders",
        element: <OrdersPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
