import { Link, Outlet } from "react-router-dom";
import useAuth from "../hooks/use-auth.js";
import "../styles.css"; // Ensure your styles are included

function NavBar() {
  const { auth, setAuth } = useAuth();

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    setAuth({ token: null });
  };

  return (
    <div className="dropdown">
      <button className="dropbtn">Menu</button>
      <div className="dropdown-content">
        <Link to="/">Home</Link>
        {auth.token ? (<>
          <Link to="/" onClick={handleLogout}>
            Log Out
          </Link>          
          <Link to="/my-profile">
            My Profile
          </Link></>     
            ) : ( 
              
              <>
          <Link to="/login">
            Login
          </Link>
          <Link to="/signup">
            Create an Account
          </Link>
          <Link to="/my-profile">
            My Profile
          <Link to="/invite">
            Invite Someone
          </Link>
              </>
              )}
      </div>
      <Outlet />
    </div>
  );
}

export default NavBar;
