import { Suspense, lazy } from "react";
import { Navigate, type RouteObject } from "react-router-dom";

const HomePage = lazy(() => import("../pages/Home"));
const GoogleAuthCallback = lazy(() => import("../pages/GoogleAuthCallback"));
const JoinPage = lazy(() => import("../pages/Join"));

export const root: RouteObject[] = [
  {
    path: "/",
    element: (
      <Suspense>
        <HomePage />
      </Suspense>
    ),
    shouldRevalidate: () => true,
  },
  {
    path: "/auth/google/callback",
    element: (
      <Suspense>
        <GoogleAuthCallback />
      </Suspense>
    ),
  },
  {
    path: "/join",
    element: (
      <Suspense>
        <JoinPage />
      </Suspense>
    ),
  },
  {
    path: "/404",
    element: <div>404 Not Found</div>,
  },
  {
    path: "/error",
    element: <div>500 Internal Server Error</div>,
  },
  {
    path: "*",
    element: <Navigate to="/404" replace />,
  },
];
