import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

export const Login = (req) =>
  signInWithEmailAndPassword(auth, req.email, req.password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      //return { status: "sussuccess", displayName: user.displayName };
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
