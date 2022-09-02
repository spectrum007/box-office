import React, { useState } from 'react';
import ActorGrid from '../Components/Actors/ActorGrid';
import CustomRadio from '../Components/CustomRadio';
import MainPageLayout from '../Components/MainPageLayout';
import ShowGrid from '../Components/Show/ShowGrid';
import { apiGet } from '../misc/config';
import { useLastQuery } from '../misc/Custom-hooks';
import {
  RadioInputsWrapper,
  SearchButtonWrapper,
  SearchInput,
} from './Home.Styled';

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
      <SearchInput
        type="text"
        placeholder="Search anything"
        onChange={onInputChange}
        onKeyDown={KeyDown}
        value={input}
      />
      <RadioInputsWrapper>
        <div>
          <CustomRadio
            label="Shows"
            id="searchShows"
            value="shows"
            checked={isShowsSearch}
            onChange={onRadioChange}
          />
        </div>
        <div>
          <CustomRadio
            label="Actors"
            id="searchPeople"
            value="people"
            checked={!isShowsSearch}
            onChange={onRadioChange}
          />
        </div>
      </RadioInputsWrapper>
      <SearchButtonWrapper>
        <button
          type="button"
          onClick={() => {
            onSearch();
          }}
        >
          Search
        </button>
      </SearchButtonWrapper>
      {renderResults()}
    </MainPageLayout>
  );
};

export default Home;
