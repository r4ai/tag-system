import {
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
  Outlet,
} from "@tanstack/react-router";
import React from "react";
import App from "./App";

const rootRoute = createRootRoute({
  component: () => React.createElement(Outlet, null),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => {
    throw redirect({ to: "/levels/$levelId", params: { levelId: "1" } });
  },
});

const levelRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/levels/$levelId",
  component: App,
});

const routeTree = rootRoute.addChildren([indexRoute, levelRoute]);

export const router = createRouter({
  routeTree,
  // Keep route matching under GitHub Pages subpath (e.g. "/<repo>/").
  basepath: import.meta.env.BASE_URL,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
