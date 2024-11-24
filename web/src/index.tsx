/* @refresh reload */
import { initializeApp } from "firebase/app";
import { createEffect, createSignal } from "solid-js";
import { render } from "solid-js/web";

import "@/assets/global.module.css";

const firebaseConfig = {
  apiKey: "AIzaSyBteNWS6uNxk9fN-jIfeQo15b_uljEYjiI",
  authDomain: "hunter-arnell.firebaseapp.com",
  projectId: "hunter-arnell",
  storageBucket: "hunter-arnell.firebasestorage.app",
  messagingSenderId: "868745956489",
  appId: "1:868745956489:web:c5efb2d9f53d2f76bdca58",
};

export const [app, setApp] = createSignal();
setApp(initializeApp(firebaseConfig));

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?",
  );
}

createEffect(async () => {
  if (app()) {
    const router = await import("@/router");

    render(() => router.default, root!);
  }
});
