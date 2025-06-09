import React, { useContext } from "react";
import { Link } from "react-router";
import { BooksContext } from "../context_folder/context";
import { AuthContext } from "../context_folder/AuthContext";
import { auth } from "../firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function Index() {
    const { user } = useContext(AuthContext);
    const { books, setBooks } = useContext(BooksContext);
    const handleLogout = () => {
      auth.signOut();
    };

    const handleDelete = async (bookId) => {
      const confirmed = window.confirm("Czy na pewno chcesz usunąć tę książkę?");
      if (!confirmed) return;

      try {
        await deleteDoc(doc(db, "books", bookId));
        alert("Książka została usunięta!");
        // Aktualizacja lokalnego stanu książek, aby usunięta książka zniknęła z widoku
        setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
      } catch (error) {
        console.error("Błąd podczas usuwania książki:", error);
        alert("Coś poszło nie tak podczas usuwania książki.");
      }
    };

    return (
      <>
        <header>
          <h1>Księgarnia Bookser</h1>
          <form className="search-bar">
            <input type="text" placeholder="Szukaj książki..." />
            <button type="submit" className="button_search">🔍</button>
          </form>

          <div className="buttons">
            {!user ? (
              <>
                <Link to="/login"><button>Logowanie</button></Link>
                <Link to="/login"><button>Rejestracja</button></Link>
              </>
            ) : (
              <>
                <span>Witaj, {user.displayName || user.email}</span>
                <button onClick={handleLogout}>Wyloguj</button>
              </>
            )}
            <button>🛒</button>
          </div>
        </header>
  
        <main>
          <aside className="filters">
            {user && (
              <Link to="/newbook">
                <button className="apply-filters">Dodaj książkę</button>
              </Link>
            )}
            <h2>Filtry</h2>
  
            <div className="filter-group">
              <label>Gatunek:</label>
              <label><input type="checkbox" name="genre" value="literatura-piekna" /> Literatura piękna</label>
              <label><input type="checkbox" name="genre" value="kryminal" /> Kryminały</label>
              <label><input type="checkbox" name="genre" value="fantastyka" /> Fantastyka</label>
              <label><input type="checkbox" name="genre" value="historia" /> Historia</label>
              <label><input type="checkbox" name="genre" value="dla-dzieci" /> Dla dzieci</label>
            </div>
  
            <div className="filter-group">
              <label>Rok wydania:</label>
              <label><input type="checkbox" name="year" value="2023" /> 2023</label>
              <label><input type="checkbox" name="year" value="2022" /> 2022</label>
              <label><input type="checkbox" name="year" value="2021" /> 2021</label>
              <label><input type="checkbox" name="year" value="2020" /> 2020</label>
              <label><input type="checkbox" name="year" value="2019" /> 2019</label>
            </div>
  
            <div className="filter-group">
              <label>Cena:</label>
              <label><input type="checkbox" name="price" value="0-50" /> 0 - 50 PLN</label>
              <label><input type="checkbox" name="price" value="51-100" /> 51 - 100 PLN</label>
              <label><input type="checkbox" name="price" value="101-150" /> 101 - 150 PLN</label>
              <label><input type="checkbox" name="price" value="151+" /> Powyżej 150 PLN</label>
            </div>
  
            <div className="filter-group">
              <label>Autor:</label>
              <label><input type="checkbox" name="author" value="tokarczuk" /> Olga Tokarczuk</label>
              <label><input type="checkbox" name="author" value="mickiewicz" /> Adam Mickiewicz</label>
              <label><input type="checkbox" name="author" value="lem" /> Stanisław Lem</label>
              <label><input type="checkbox" name="author" value="sapkowski" /> Andrzej Sapkowski</label>
            </div>
  
            <div className="filter-group">
              <label>Wydawnictwo:</label>
              <label><input type="checkbox" name="publisher" value="znak" /> Znak</label>
              <label><input type="checkbox" name="publisher" value="czytelnik" /> Czytelnik</label>
              <label><input type="checkbox" name="publisher" value="pruszynski" /> Prószyński i S-ka</label>
              <label><input type="checkbox" name="publisher" value="rebis" /> Rebis</label>
            </div>
  
            <div className="filter-group">
              <label>Okładka:</label>
              <label><input type="checkbox" name="cover" value="twarda" /> Twarda</label>
              <label><input type="checkbox" name="cover" value="miękka" /> Miękka</label>
            </div>
  
            <button className="apply-filters">Zastosuj filtry</button>
          </aside>
  
          <section className="books">
            {books.map((book) => (
              <div key={book.id} className="book-tile">
                <div className="book-image">
                  <img src={book.image} alt={book.title} className="default-img" />
                  <img src={book.hoverImage} alt={`${book.title} (hover)`} className="hover-img" />
                </div>
                <p className="book-title">{book.title}</p>
                <p className="book-price">
                  {typeof book.price === 'number' ? `${book.price.toFixed(2)} PLN` : 'Brak ceny'}
                </p>
                {user?.uid === book.owner && (
                  <div className="book-actions">
                    <Link to={`/editbook/${book.id}`} className="edit-button">Edytuj</Link>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(book.id)}
                    >
                      Usuń
                    </button>
                  </div>
                )}
                <button className="add-to-cart">Dodaj do koszyka</button>
              </div>
            ))}
          </section>
        </main>
  
        <footer>
            <p>Autor: Dawid Kawałko</p>
        </footer>
      </>
    );
}
  