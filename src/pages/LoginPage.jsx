import "../styles.css";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

import LoginForm from "../components/LoginForm";

import useAuth from "../hooks/use-auth.js";

function LoginPage() {
  const {auth, setAuth} = useAuth();
  return (
  <>
    <Header />
    <LoginForm />
    <Footer />
  </>
  );

}



export default LoginPage;
