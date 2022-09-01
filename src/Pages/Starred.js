import React, { useEffect, useReducer } from 'react';
import MainPageLayout from '../Components/MainPageLayout';
import { usePersistedReducer } from '../misc/Custom-hooks';
import { apiGet } from '../misc/config';
import ShowGrid from '../Components/Show/ShowGrid';

const reducer = (prevState, action) => {
  switch (action.type) {
    case 'nothingStarred': {
      return { ...prevState, isLoading: false };
    }
    case 'ShowsFound': {
      return { ...prevState, isLoading: false, shows: action.shows };
    }
    case 'GetError': {
      return { ...prevState, isLoading: false, error: action.error };
    }
    default:
      return prevState;
  }
};
const initialState = {
  shows: [],
  isLoading: true,
  error: null,
};

const Starred = () => {
  const [starred] = usePersistedReducer();

  const [{ shows, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    if (starred && starred.length > 0) {
      const promises = starred.map(Showid => {
        return apiGet(`/shows/${Showid}`);
      });
      Promise.all(promises)
        .then(apiData => {
          return apiData.map(show => ({ show })); // this code is converting {<Show data inside this object >} to {show : {<show_data isnide this object>}}
        })
        .then(results => {
          dispatch({ type: 'ShowsFound', shows: results });
        })
        .catch(err => {
          dispatch({ type: 'GetError', error: err.message });
        });
    } else {
      dispatch({ type: 'nothingStarred' });
    }
  }, [starred]);
  // console.log(starred, isLoading);

  return (
    <MainPageLayout>
      {isLoading && <div> Shows are still loading </div>}
      {error && <div> Error occured : {error}</div>}
      {!isLoading && !shows && <div> No shows were added </div>}
      {!isLoading && !error && shows && <ShowGrid data={shows} />}
    </MainPageLayout>
  );
};

export default Starred;
