import React, { useContext, useState } from "react";
import { Link } from "react-router";
import { BooksContext } from "../context_folder/context";
import { AuthContext } from "../context_folder/AuthContext";
import { auth } from "../firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function Index() {
  const { user } = useContext(AuthContext);
  const { books, setBooks } = useContext(BooksContext);

  const [showOnlyMine, setShowOnlyMine] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    genre: [],
    year: [],
    price: [],
    author: [],
    publisher: [],
    cover: [],
  });

  const [appliedSearchQuery, setAppliedSearchQuery] = useState("");

  const handleLogout = () => auth.signOut();

  const toggleMyBooks = () => setShowOnlyMine((prev) => !prev);

  const handleFilterChange = (category, value) => {
    setFilters((prev) => {
      const current = prev[category];
      return {
        ...prev,
        [category]: current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    });
  };

  const applyAllFilters = (book) => {
    const { genre, year, price, author, publisher, cover } = filters;

    const matches = [
      !genre.length || genre.includes(book.genre),
      !year.length || year.includes(String(book.year)),
      !price.length ||
        price.some((range) => {
          const [min, maxRaw] = range.split("-");
          const max = maxRaw === "+" ? Infinity : parseFloat(maxRaw);
          const minVal = parseFloat(min);
          return book.price >= minVal && book.price <= max;
        }),
      !author.length || author.includes(book.author),
      !publisher.length || publisher.includes(book.publisher),
      !cover.length || cover.includes(book.cover),
    ];

    return matches.every(Boolean);
  };

  const filteredBooks = (showOnlyMine && user
    ? books.filter((book) => book.owner === user.uid)
    : books
  )
    .filter(applyAllFilters)
    .filter((book) =>
      book.title.toLowerCase().includes(appliedSearchQuery.trim().toLowerCase())
    );


  const handleDelete = async (bookId) => {
    const confirmed = window.confirm("Czy na pewno chcesz usunąć tę książkę?");
    if (!confirmed) return;

    try {
      await deleteDoc(doc(db, "books", bookId));
      alert("Książka została usunięta!");
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
    } catch (error) {
      console.error("Błąd podczas usuwania książki:", error);
      alert("Coś poszło nie tak podczas usuwania książki.");
    }
  };

  return (
    <>
      <header>
        <h1>Księgarnia Bookser</h1>
        <form
          className="search-bar"
          onSubmit={(e) => {
            e.preventDefault();
            setAppliedSearchQuery(searchQuery);
          }}
        >
          <input
            type="text"
            placeholder="Szukaj książki..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
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
              <button onClick={toggleMyBooks}>
                {showOnlyMine ? "Wszystkie" : "Moje"}
              </button>
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
            {["literatura-piekna", "kryminal", "fantastyka", "historia", "dla-dzieci"].map((value) => (
              <label key={value}>
                <input type="checkbox" onChange={() => handleFilterChange("genre", value)} /> {value.replace("-", " ")}
              </label>
            ))}
          </div>

          <div className="filter-group">
            <label>Rok wydania:</label>
            {[2023, 2022, 2021, 2020, 2019].map((value) => (
              <label key={value}>
                <input type="checkbox" onChange={() => handleFilterChange("year", String(value))} /> {value}
              </label>
            ))}
          </div>

          <div className="filter-group">
            <label>Cena:</label>
            {["0-50", "51-100", "101-150", "151+"].map((value) => (
              <label key={value}>
                <input type="checkbox" onChange={() => handleFilterChange("price", value)} /> {value.replace("+", "+ PLN")}
              </label>
            ))}
          </div>

          <div className="filter-group">
            <label>Autor:</label>
            {["tokarczuk", "mickiewicz", "lem", "sapkowski"].map((value) => (
              <label key={value}>
                <input type="checkbox" onChange={() => handleFilterChange("author", value)} /> {value}
              </label>
            ))}
          </div>

          <div className="filter-group">
            <label>Wydawnictwo:</label>
            {["znak", "czytelnik", "pruszynski", "rebis"].map((value) => (
              <label key={value}>
                <input type="checkbox" onChange={() => handleFilterChange("publisher", value)} /> {value}
              </label>
            ))}
          </div>

          <div className="filter-group">
            <label>Okładka:</label>
            {["twarda", "miękka"].map((value) => (
              <label key={value}>
                <input type="checkbox" onChange={() => handleFilterChange("cover", value)} /> {value}
              </label>
            ))}
          </div>
        </aside>

        <section className="books">
          {filteredBooks.map((book) => (
            <div key={book.id} className="book-tile">
              <div className="book-image">
                <img src={book.image} alt={book.title} className="default-img" />
                <img src={book.hoverImage} alt={`${book.title} (hover)`} className="hover-img" />
              </div>
              <p className="book-title">{book.title}</p>
              <p className="book-price">
                {typeof book.price === "number" ? `${book.price.toFixed(2)} PLN` : "Brak ceny"}
              </p>
              {user?.uid === book.owner && (
                <div className="book-actions">
                  <Link to={`/editbook/${book.id}`} className="edit-button">Edytuj</Link>
                  <button className="delete-button" onClick={() => handleDelete(book.id)}>Usuń</button>
                </div>
              )}
              <button className="add-to-cart">Dodaj do koszyka</button>
            </div>
          ))}
        </section>
      </main>

      <footer>
        <p>Autor: Dawid</p>
      </footer>
    </>
  );
}
