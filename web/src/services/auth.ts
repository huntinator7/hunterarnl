import { Auth } from "firebase/auth";

export function saveAuthToLS(auth: Auth) {
  localStorage.setItem("fb_auth", JSON.stringify(auth));
}

export function getAuthFromLS(): Auth {
  const lsAuth = localStorage.getItem("fb_auth");
  return JSON.parse(lsAuth ?? "{}") as Auth;
}

export function removeAuthFromLS() {
  localStorage.removeItem("fb_auth");
}
