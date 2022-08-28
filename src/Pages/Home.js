import React, { useState } from 'react';
import MainPageLayout from '../Components/MainPageLayout';

const Home = () => {
  const [input, setInput] = useState('');

  const onSearch = (search = input) => {
    // https://api.tvmaze.com/search/shows?q=action
    const url = `https://api.tvmaze.com/search/shows?q=${search}`;
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
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

  return (
    <MainPageLayout>
      {' '}
      <input
        type="text"
        onChange={onInputChange}
        onKeyDown={KeyDown}
        value={input}
      />
      <br />
      <button
        type="button"
        onClick={() => {
          onSearch();
        }}
      >
        {' '}
        Search
      </button>
    </MainPageLayout>
  );
};

export default Home;
