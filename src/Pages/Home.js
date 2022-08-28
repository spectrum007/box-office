import React, { useState } from 'react';
import MainPageLayout from '../Components/MainPageLayout';
import { apiGet } from '../misc/config';

const Home = () => {
  const [input, setInput] = useState('');
  const [Results, setResults] = useState(null);

  const onSearch = (search = input) => {
    apiGet(`/search/shows?q=${search}`).then(result => {
      setResults(result);
    });
  };

  const onInputChange = ev => {
    setInput(ev.target.value);
  };

  const KeyDown = ev => {
    if (ev.keyCode === 13) {
      onSearch();
    }
  };

  const renderResults = (results = Results) => {
    if (results && results.length === 0) {
      return <div> No results to be shown </div>;
    }
    if (results && results.length > 0) {
      return (
        <div>
          {results.map(item => (
            <div key={item.show.id}> {item.show.name} </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <MainPageLayout>
      <input
        type="text"
        onChange={onInputChange}
        onKeyDown={KeyDown}
        value={input}
      />
      <button
        type="button"
        onClick={() => {
          onSearch();
        }}
      >
        Search
      </button>
      <div> {renderResults(Results)}</div>
    </MainPageLayout>
  );
};

export default Home;
