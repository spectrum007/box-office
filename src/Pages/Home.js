import React, { useState } from 'react';
import ActorGrid from '../Components/Actors/ActorGrid';
import MainPageLayout from '../Components/MainPageLayout';
import ShowGrid from '../Components/Show/ShowGrid';
import { apiGet } from '../misc/config';
import { useLastQuery } from '../misc/Custom-hooks';

const Home = () => {
  const [input, setInput] = useLastQuery();
  const [Results, setResults] = useState(null);
  const [SearchOption, SetSearchOption] = useState('shows');

  const isShowsSearch = SearchOption === 'shows';

  const onSearch = () => {
    apiGet(`/search/${SearchOption}?q=${input}`).then(result => {
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
      return Results[0].show ? (
        <ShowGrid data={Results} />
      ) : (
        <ActorGrid data={Results} />
      );
    }

    return null;
  };

  const onRadioChange = ev => {
    SetSearchOption(ev.target.value);
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
          onSearch();
        }}
      >
        Search
      </button>
      {renderResults()}
    </MainPageLayout>
  );
};

export default Home;
