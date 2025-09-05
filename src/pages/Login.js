import { auth, googleProvider } from "../firebase";
import { signInWithPopup, signOut } from "firebase/auth";

function Login() {
  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-5 text-center">
      <h2>Login</h2>
      <button onClick={loginWithGoogle}>Login with Google</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Login;
