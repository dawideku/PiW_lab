import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebaseConfig";

const Login = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/"); // Przekierowanie po udanym logowaniu
    } catch (error) {
      console.error("Błąd logowania:", error);
    }
  };

  return (
    <div>
      <header>
        <h1>Księgarnia Bookser</h1>
        <form className="search-bar">
          <input type="text" placeholder="Szukaj książki..." />
          <button type="submit" className="button_search">🔍</button>
        </form>
        <div className="buttons">
          <Link to="/"><button>Powrót</button></Link>
        </div>
      </header>

      <main>
        <section className="login-section">
          <h2>Zaloguj się</h2>
          <p>Użyj konta Google, aby zalogować się do Booksera:</p>
          <button onClick={signInWithGoogle} className="apply-filters">
            Zaloguj się przez Google
          </button>
          <div style={{ marginTop: '1rem' }}>
            <Link to="/" className="cancel-button">Powrót</Link>
          </div>
        </section>
      </main>

      <footer>
        <p>Autor: Dawid</p>
      </footer>
    </div>
  );
};

export default Login;
