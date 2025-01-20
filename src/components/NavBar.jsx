import { Link, Outlet } from "react-router-dom";
import useAuth from "../hooks/use-auth.js";
import "../styles.css"

function NavBar() {
  const {auth, setAuth} = useAuth();

  const handleLogout = () => {
      window.localStorage.removeItem("token");
      setAuth({ token: null });
    };
    console.log(auth)

    return (
        <div class="navbar">
          <nav class="buttons">
            <Link to="/">Home</Link>
            {auth.token ? (
              <Link to="/" onClick={handleLogout}>
                Log Out
              </Link>
            ) : null}
          </nav>

        {/* React Router will pass components into the <Outlet /> based on the path */}
        <Outlet />
      </div>
    );
  }
  
  export default NavBar;