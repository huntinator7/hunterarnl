import { Navigate } from "@solidjs/router";
import { ParentComponent } from "solid-js";
import { getAuthFromLS } from "@/services/auth";
import { getAuth } from "firebase/auth";

const auth = getAuthFromLS();
const badAuth = getAuth();

export const AuthChecker: ParentComponent = (props) => {
  console.log(auth, auth.currentUser, badAuth, badAuth.currentUser);
  if (!auth.currentUser) {
    return <Navigate href="/" />;
  }
  return props.children;
};
