import React, { useState, useEffect } from 'react';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://openlibrary.org/search.json?q=${searchTerm}`);
      const data = await response.json();
      setResults(data.docs);
    };
    
    fetchData();
  }, [searchTerm]);
  
  return (
    <div>
      <input
        type="text"
        placeholder="Search for a book"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <ul>
        {results.map(result => (
          <li key={result.key}>{result.title_suggest}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
