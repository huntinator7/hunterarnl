import { Navigate, useNavigate } from "@solidjs/router";
import { getAuth, signOut } from "firebase/auth";
import { Component } from "solid-js";

const Page: Component = () => (
  <div>
    Me page
    <button onClick={logout}>Logout</button>
  </div>
);

function logout() {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      console.log("signed out");
      const navigate = useNavigate();
      navigate("/", { replace: true });
    })
    .catch((e) => console.error(e));
}

export default Page;
