import "../styles.css";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

import SignupPageForm from "../components/SignUpPageForm.jsx"

function SignUpPage() {
  return (
    <>
      <Header />
      <SignupPageForm />
      <Footer />;
    </>
  );
}

export default SignUpPage;