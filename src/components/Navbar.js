import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";

function Navbar({ user }) {
  return (
    <nav className="bg-gray-100 shadow-md p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">
        Interview Debrief
      </Link>
      <div>
        {user ? (
          <>
            <span className="mr-4 font-medium">Hello, {user.displayName}</span>
            <button
              onClick={() => signOut(auth)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
