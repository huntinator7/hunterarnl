import { type Component } from "solid-js";

import { RoutePaths } from "@/router/routes";

import styles from "./index.module.css";

interface Link {
  label: string;
  path: RoutePaths;
}

interface Category {
  links: Link[];
  label: string;
}

const categories: Category[] = [
  {
    label: "Garbage",
    links: [
      {
        label: "Log Garbage",
        path: "/garbage/log",
      },
      {
        label: "History",
        path: "/garbage/history",
      },
    ],
  },
  {
    label: "Meals",
    links: [
      {
        label: "Add Meal",
        path: "/meals/add",
      },
      {
        label: "Schedule",
        path: "/meals/schedule",
      },
    ],
  },
];

const HomepageButtonList = (category: Category) => (
  <div class={styles.homepageButtonList}>
    <p>{category.label}</p>
    <div class={styles.linkList}>
      {category.links.map((l) => (
        <HomepageButton {...l} />
      ))}
    </div>
  </div>
);

const HomepageButton = (link: Link) => (
  <a class={styles.homepageButton} href={link.path} aria-label={link.label}>
    {link.label}
  </a>
);

export const Home: Component = () => (
  <div class={styles.main}>
    {categories.map((c) => (
      <HomepageButtonList {...c} />
    ))}
  </div>
);
