import { createContext, useState } from "react";

export const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "Tajemnica Zazu",
      price: 39.99,
      image: "zazu.jpg",
      hoverImage: "zazu_glasses.jpg",
      genre: "fantastyka",
      year: 2023,
      author: "sapkowski",
      publisher: "znak",
      cover: "twarda"
    },
    {
      id: 2,
      title: "Lalka",
      price: 29.99,
      image: "zazu.jpg",
      hoverImage: "zazu_glasses.jpg",
      genre: "literatura-piekna",
      year: 2022,
      author: "tokarczuk",
      publisher: "czytelnik",
      cover: "miękka"
    },
    ...Array.from({ length: 13 }).map((_, index) => ({
      id: index + 3,
      title: `Książka przykładowa ${index + 3}`,
      price: (index + 3) * 10,
      image: "zazu.jpg",
      hoverImage: "zazu_glasses.jpg",
      genre: ["fantastyka", "literatura-piekna", "kryminal"][index % 3],
      year: 2023 - (index % 5),
      author: ["tokarczuk", "mickiewicz", "lem", "sapkowski"][index % 4],
      publisher: ["znak", "czytelnik", "pruszynski", "rebis"][index % 4],
      cover: ["twarda", "miękka"][index % 2]
    }))
  ]);

  return (
    <BooksContext.Provider value={{ books, setBooks }}>
      {children}
    </BooksContext.Provider>
  );
};