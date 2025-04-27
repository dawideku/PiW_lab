import React from "react";
import { Link } from "react-router";

export default function Index() {
    return (
      <>
        <header>
          <h1>Księgarnia Bookser</h1>
          <form className="search-bar">
            <input type="text" placeholder="Szukaj książki..." />
            <button type="submit" className="button_search">🔍</button>
          </form>
          <div className="buttons">
            <button>Logowanie</button>
            <button>Rejestracja</button>
            <button>🛒</button>
          </div>
        </header>
  
        <main>
          <aside className="filters">
            <Link to="/newbook">
              <button className="apply-filters">Dodaj książkę</button>
            </Link>
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
            {Array.from({ length: 15 }).map((_, index) => (
              <div key={index} className="book-tile">
                <div className="book-image">
                  <img src="zazu.jpg" alt={`Książka ${index + 1}`} className="default-img" />
                  <img src="zazu_glasses.jpg" alt={`Książka ${index + 1} (hover)`} className="hover-img" />
                </div>
                <p className="book-title">Tajemnica Zazu</p>
                <p className="book-price">39.99 PLN</p>
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
  