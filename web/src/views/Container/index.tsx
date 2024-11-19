import { ParentComponent } from "solid-js";

import styles from "./index.module.css";

export const Container: ParentComponent = (props) => {
  return (
    <div class={styles.container}>
      <header class={styles.header}>
        <a href="/">Hunter's Site</a>
      </header>
      <div class={styles.content}>{props.children}</div>
    </div>
  );
};
