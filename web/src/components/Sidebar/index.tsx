import { Component, ParentComponent } from "solid-js";

import styles from "./index.module.css";
import { RoutePaths } from "@/router/routes";

interface Link {
  label: string;
  path: RoutePaths;
}

const links: Link[] = [];

export const Sidebar: Component = () => <div></div>;
