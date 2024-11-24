import { getAuth } from "firebase/auth";

const auth = getAuth();
console.log(auth.currentUser);

export default () => <div>Home</div>;
