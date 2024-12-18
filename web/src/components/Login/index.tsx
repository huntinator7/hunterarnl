import { Component, createSignal } from "solid-js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  initializeAuth,
  browserLocalPersistence,
} from "firebase/auth";
import { Navigate, useNavigate } from "@solidjs/router";
import { app } from "@/index";
import { saveAuthToLS } from "@/services/auth";

const provider = new GoogleAuthProvider();

const [redirUser, setRedirUser] = createSignal<string>("");

const Login: Component = () => (
  <div>
    <button onClick={signIn}>Login</button>
    <button onClick={() => redir("/me")}>Redirect me</button>
    <button onClick={() => redir("/")}>Redirect home</button>
    {redirUser() && (
      <Navigate
        href={(navigate) => {
          return "/me";
        }}
      />
    )}
  </div>
);

function redir(url: string) {
  // useNavigate()("/", { replace: true });
  setRedirUser(url);
}

function signIn() {
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential!.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log("AUTH", auth, result);
      saveAuthToLS(auth);
      setRedirUser("/me");
      // useNavigate()("/me");
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.error(JSON.stringify(error));
      saveAuthToLS(auth);
      setRedirUser("/");
      // ...
    });
}
export default Login;
