import { Suspense, lazy } from "react";
import { Navigate, type RouteObject } from "react-router-dom";
import Layout from "../components/Layout/Layout";

const MessagePage = lazy(() => import("../pages/Message"));
const HomePage = lazy(() => import("../pages/Home"));
const GoogleAuthCallbackPage = lazy(
  () => import("../pages/GoogleAuthCallback")
);
const GithubAuthCallbackPage = lazy(
  () => import("../pages/GithubAuthCallback")
);
const JoinPage = lazy(() => import("../pages/Join"));
const MyPage = lazy(() => import("../pages/My"));
const MyLogPage = lazy(() => import("../pages/MyLog"));

export const root: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense>
            <HomePage />
          </Suspense>
        ),
        shouldRevalidate: () => true,
      },
      {
        path: "/my",
        element: (
          <Suspense>
            <MyPage />
          </Suspense>
        ),
      },
      {
        path: "/worklog",
        element: (
          <Suspense>
            <MyLogPage />
          </Suspense>
        ),
      },
      {
        path: "/message",
        element: (
          <Suspense>
            <MessagePage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/auth/google/callback",
    element: (
      <Suspense>
        <GoogleAuthCallbackPage />
      </Suspense>
    ),
  },
  {
    path: "/auth/github/callback",
    element: (
      <Suspense>
        <GithubAuthCallbackPage />
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
