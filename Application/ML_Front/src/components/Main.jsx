/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import { TiDeleteOutline } from "react-icons/ti";


function Main() {
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [margin, setMargin] = useState([40]);
  const [books, setBooks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const booksEndpoint = 'http://localhost:8000/get_books/';
  const recommendationsEndpoint = `http://localhost:8000/recommend/`

  async function handleGetBooks() {
    try {
      console.log('hey')
      const res = await axios.get(booksEndpoint, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.data;
      console.log(data.books)
      setBooks(data.books);
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    handleGetBooks();
  }, []);


  async function getRecommendations(selectedBooks){
    try {
      setRecommendations([])
      const titles = selectedBooks.map( book => book.title )
      console.log(titles)
      const res = await axios.post(recommendationsEndpoint, {books : titles} , { 'Content-Type' : 'application/json'} );
      const data = res.data;
      console.log(data.recommendations)
      setRecommendations(data.recommendations)
    } catch (err) {
      console.error(err.message)
    }
    
  }

  const handleGetRecommendations = async () => {
    await getRecommendations(selectedBooks);
    setMargin(4);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  const handleSelectBook = (book) => {
    setSelectedBooks((prev) => [
      ...prev,
      book
    ]);
    setInputValue(''); // Clear input after selection
    setFilteredBooks([]); // Clear suggestions
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 p-8">
      <div
        className={`mx-auto mt-${margin} max-w-2xl rounded-xl bg-white p-6 shadow-lg transition-all duration-500`}
      >
        <h1 className="mb-8 text-center text-3xl font-bold text-purple-600">
          Book Recommendations
        </h1>

        <div className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Enter books you have read:
            </label>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              placeholder="Start typing book titles..."
            />

            {filteredBooks.length > 0 && (
              <ul className="absolute mt-2 max-h-48 overflow-auto border border-gray-300 rounded-lg w-full max-w-xl bg-white shadow-lg z-10">
                {filteredBooks.map((book) => (
                  <li
                    key={book.id}
                    onClick={() => handleSelectBook(book)}
                    className="cursor-pointer px-4 py-2 hover:bg-gray-200"
                  >
                    {book.title} 
                  </li>
                ))}
              </ul>
            )}

            <button
              onClick={handleGetRecommendations}
              className="w-full rounded-lg bg-purple-500 px-4 py-2 font-bold text-white transition-colors hover:bg-purple-600"
              disabled={selectedBooks.length === 0}
            >
              Get Recommendations
            </button>
          </div>

          {selectedBooks.length > 0 && (
            <div className="mt-4">
              <ul className="list-disc pl-5">
                {selectedBooks.map((book) => (
                  <li key={book.id} className="text-purple-600 flex items-center space-x-2">
                    <span>{book.title}</span> <button className="text-red-500" onClick={(e) => { 
                      if(selectedBooks.length <= 1 )  setRecommendations([])
                      setSelectedBooks( books => books.filter( b => b.id != book.id ) ) ; 
                                                                                                   
                     } } ><TiDeleteOutline /></button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {recommendations?.length > 0 && (
            <div>
              <h2 className="mb-4 text-xl font-semibold text-purple-600">
                Recommended books:
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {recommendations.map((book , i) => (
                  <div
                    key={i}
                    className="rounded-lg bg-purple-50 p-4 text-center"
                  >
                    <img
                      src={book.image}
                      alt={book.title}
                      className="mx-auto mb-2 h-48 w-32 rounded object-cover"
                    />
                    <h3 className="font-medium text-purple-700">{book.title}</h3>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default Main;
