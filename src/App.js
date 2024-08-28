import { useEffect, useState } from 'react';
import './App.css';

// Create a small search application with an auto-suggestion feature using React. The application should include:

// A search input field where users can type their query.
// A list of auto-suggestions that appears below the input field based on the query.
// Debouncing to limit the number of search requests as the user types.

export default function App() {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {

    if (input === '') {
      setSuggestions([]);
      return;
    }

    let debounceTime = setTimeout(() => {
      fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then(data => {
          setSuggestions(
            data.products.map((item) => {

              if (item.title.toLowerCase().includes(input.toLowerCase()))
                return {
                  id: item.id,
                  value: item.title
                }
              else
                return undefined;
            }).filter(item => item !== undefined)
          )
        });
    }, 1000);

    return () => {
      clearTimeout(debounceTime);
    }

  }, [input]);

  useEffect(() => {
    console.log(suggestions)
  }, [suggestions]);

  return (
    <div className="App">
      <p>Dummy Api used: <a href='https://dummyjson.com/products'>https://dummyjson.com/products</a> </p>
      <p>Autosuggestion on title field.</p>
      <h1>Search Products: </h1>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeHolder="Enter search term..."
        style={{ border: '2px solid rgba(0, 0, 0, 0.2)', 
        backgroundColor: '#ece63d5b',
        borderRadius: '10px', padding: '10px', margin: '10px auto', width: '50%' }}
      />

      {
        suggestions.length > 0 && <div style={{ border: '2px solid rgba(48, 213, 199, 0.664)', borderRadius: '10px', padding: '10px', margin: '10px auto', width: '50%' }}>
          {suggestions.map((item) => {
            return <p key={item.id}>
              {item.value}
            </p>
          })}
        </div>
      }
    </div>
  );
}