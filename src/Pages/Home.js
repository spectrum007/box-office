import React, { useState } from 'react';
import MainPageLayout from '../Components/MainPageLayout';
import { apiGet } from '../misc/config';

const Home = () => {
  const [input, setInput] = useState('');
  const [Results, setResults] = useState(null);
  const [SearchOption, SetSeatchOption] = useState('shows');

  const isShowsSearch = SearchOption === 'shows';

  const onSearch = search => {
    apiGet(`/search/${SearchOption}?q=${search}`).then(result => {
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

  const renderResults = () => {
    if (Results && Results.length === 0) {
      return <div> No results to be shown </div>;
    }
    if (Results && Results.length > 0) {
      return Results[0].show
        ? Results.map(item => <div key={item.show.id}> {item.show.name}</div>)
        : Results.map(item => (
            <div key={item.person.id}> {item.person.name} </div>
          ));
    }

    return null;
  };

  const onRadioChange = ev => {
    SetSeatchOption(ev.target.value);
  };

  return (
    <MainPageLayout>
      <input
        type="text"
        placeholder="Search anything"
        onChange={onInputChange}
        onKeyDown={KeyDown}
        value={input}
      />
      <div>
        <label htmlFor="searchShows">
          Shows
          <input
            id="searchShows"
            type="radio"
            value="shows"
            checked={isShowsSearch}
            onChange={onRadioChange}
          />
        </label>
        <label htmlFor="searchPeople">
          People
          <input
            id="searchPeople"
            type="radio"
            value="people"
            checked={!isShowsSearch}
            onChange={onRadioChange}
          />
        </label>
      </div>

      <button
        type="button"
        onClick={() => {
          onSearch(input);
        }}
      >
        Search
      </button>
      {renderResults()}
    </MainPageLayout>
  );
};

export default Home;
