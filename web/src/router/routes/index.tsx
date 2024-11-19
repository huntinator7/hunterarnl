import { Route } from "@solidjs/router";
import { Home } from "@/views/Home";
import { GarbageLog } from "@/views/Garbage/Log";
import { GarbageHistory } from "@/views/Garbage/History";
import { AddMeal } from "@/views/Meals/AddMeal";
import { Component } from "solid-js";

interface Route {
  path: RoutePaths;
  component: Component;
}

export type RoutePaths =
  "/" |
  "/garbage/log" |
  "/garbage/history" |
  "/meals/add" |
  "/meals/schedule";


export const routes: Route[] = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/garbage/log",
    component: GarbageLog,
  },
  {
    path: "/garbage/history",
    component: GarbageHistory,
  },
  {
    path: "/meals/add",
    component: AddMeal,
  },
];

export default routes.map((r) => <Route {...r} />);
