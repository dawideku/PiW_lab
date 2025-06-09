import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { AuthContext } from '../context_folder/AuthContext';

const EditBook = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    year: '',
    price: '',
    publisher: '',
  });

  useEffect(() => {
    const fetchBook = async () => {
      const docRef = doc(db, 'books', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const bookData = docSnap.data();

        // zabezpieczenie – tylko właściciel może edytować
        if (bookData.owner !== user?.uid) {
          alert('Nie masz uprawnień do edycji tej książki.');
          navigate('/');
          return;
        }

        setFormData({
          title: bookData.title || '',
          author: bookData.author || '',
          genre: bookData.genre || '',
          year: bookData.year || '',
          price: bookData.price || '',
          publisher: bookData.publisher || '',
        });
      } else {
        alert('Nie znaleziono książki');
        navigate('/');
      }
    };

    fetchBook();
  }, [id, navigate, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'year' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, 'books', id);
      await updateDoc(docRef, { ...formData });
      alert('Książka zaktualizowana!');
      navigate('/');
    } catch (error) {
      console.error('Błąd przy aktualizacji książki:', error);
      alert('Wystąpił problem.');
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
          <button>Logowanie</button>
          <button>Rejestracja</button>
          <button>🛒</button>
        </div>
      </header>

      <main>
        <section className="add-book-form">
          <h2>Edytuj książkę</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Tytuł książki:</label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />

            <label htmlFor="author">Autor:</label>
            <select id="author" name="author" value={formData.author} onChange={handleChange}>
              <option value="tokarczuk">Olga Tokarczuk</option>
              <option value="mickiewicz">Adam Mickiewicz</option>
              <option value="lem">Stanisław Lem</option>
              <option value="sapkowski">Andrzej Sapkowski</option>
            </select>

            <label htmlFor="genre">Gatunek:</label>
            <select id="genre" name="genre" value={formData.genre} onChange={handleChange}>
              <option value="literatura-piekna">Literatura piękna</option>
              <option value="kryminal">Kryminał</option>
              <option value="fantastyka">Fantastyka</option>
              <option value="historia">Historia</option>
              <option value="dla-dzieci">Dla dzieci</option>
            </select>

            <label htmlFor="year">Rok wydania:</label>
            <input type="number" id="year" name="year" value={formData.year} onChange={handleChange} min="1900" max="2025" required />

            <label htmlFor="price">Cena (PLN):</label>
            <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} min="0" step="0.01" required />

            <label htmlFor="publisher">Wydawnictwo:</label>
            <select id="publisher" name="publisher" value={formData.publisher} onChange={handleChange}>
              <option value="znak">Znak</option>
              <option value="czytelnik">Czytelnik</option>
              <option value="prószyński">Prószyński i S-ka</option>
              <option value="rebis">Rebis</option>
            </select>

            <div className="form-buttons">
              <Link to="/" className="cancel-button">Anuluj</Link>
              <button type="submit" className="apply-filters">Zapisz zmiany</button>
            </div>
          </form>
        </section>
      </main>

      <footer>
        <p>Autor: Dawid</p>
      </footer>
    </div>
  );
};

export default EditBook;
