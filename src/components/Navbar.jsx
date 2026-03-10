import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {

  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">

      <Link to="/" className="logo">
        TaskManager
      </Link>

      <div>

        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {user && (
          <>
            <span className="user">{user.name}</span>
            <button onClick={logout}>Logout</button>
          </>
        )}

      </div>

    </nav>
  );
}