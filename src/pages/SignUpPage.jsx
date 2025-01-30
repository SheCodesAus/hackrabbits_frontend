import "../styles.css";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

import SignUpPageForm from "../components/SignUpPageForm.jsx"

function SignUpPage() {
  return (
  <>
      <Header />
      <SignUpPageForm />
      <Footer />;
  </>
  );
}

export default SignUpPage;