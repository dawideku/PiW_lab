import React, { useState } from 'react';
import { Link } from 'react-router';

const Newbook = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: 'tokarczuk',
    genre: 'literatura-piekna',
    year: '',
    price: '',
    publisher: 'znak',
    cover: 'twarda',
    coverImage: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'price' || name === 'year' ? Number(value) : value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      coverImage: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
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
          <button>Logowanie</button>
          <button>Rejestracja</button>
          <button>🛒</button>
        </div>
      </header>

      <main>
        <section className="add-book-form">
          <h2>Dodaj nową książkę</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Tytuł książki:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <label htmlFor="author">Autor:</label>
            <select
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
            >
              <option value="tokarczuk">Olga Tokarczuk</option>
              <option value="mickiewicz">Adam Mickiewicz</option>
              <option value="lem">Stanisław Lem</option>
              <option value="sapkowski">Andrzej Sapkowski</option>
            </select>

            <label htmlFor="genre">Gatunek:</label>
            <select
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
            >
              <option value="literatura-piekna">Literatura piękna</option>
              <option value="kryminal">Kryminał</option>
              <option value="fantastyka">Fantastyka</option>
              <option value="historia">Historia</option>
              <option value="dla-dzieci">Dla dzieci</option>
            </select>

            <label htmlFor="year">Rok wydania:</label>
            <input
              type="number"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              min="1900"
              max="2025"
              required
            />

            <label htmlFor="price">Cena (PLN):</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />

            <label htmlFor="publisher">Wydawnictwo:</label>
            <select
              id="publisher"
              name="publisher"
              value={formData.publisher}
              onChange={handleChange}
            >
              <option value="znak">Znak</option>
              <option value="czytelnik">Czytelnik</option>
              <option value="prószyński">Prószyński i S-ka</option>
              <option value="rebis">Rebis</option>
            </select>

            <label htmlFor="cover">Okładka:</label>
            <select
              id="cover"
              name="cover"
              value={formData.cover}
              onChange={handleChange}
            >
              <option value="twarda">Twarda</option>
              <option value="miekka">Miękka</option>
            </select>

            <label htmlFor="cover-image">Dodaj zdjęcie okładki:</label>
            <input
              type="file"
              id="cover-image"
              name="cover-image"
              accept="image/*"
              onChange={handleFileChange}
            />
            
            <div className="form-buttons">
              <Link to="/" className="cancel-button">Anuluj</Link>
              <button type="submit" className="apply-filters">Dodaj książkę</button>
            </div>
          </form>
        </section>
      </main>

      <footer>
        <p>Autor: Dawid Kawałko</p>
      </footer>
    </div>
  );
};

export default Newbook;