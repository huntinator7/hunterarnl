import { Navigate } from "@solidjs/router";
import { getAuth } from "firebase/auth";
import { ParentComponent } from "solid-js";

const auth = getAuth();

export const AuthChecker: ParentComponent = (props) => {
  console.log(auth, auth.currentUser);
  if (!auth.currentUser) {
    return <Navigate href="/" />;
  }
  return props.children;
};
