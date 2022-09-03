import { useReducer, useEffect, useState } from 'react';
import { apiGet } from './config';

function ShowsReducer(prevState, action) {
  // The action is just an object we pass when we use the dispatch method
  switch (action.type) {
    case 'Add': {
      return [...prevState, action.showId];
    }
    case 'Remove': {
      return prevState.filter(showId => showId !== action.showId);
    }
    default:
      return prevState;
  }
}

// all this below code is used in Starred.js to merge useEffect and useReducer or useState to set data in the localstorage and get data from it and then fethch the shows id mentioned in the localStorage and return it in  form of an array of object

function usePersistedReducer(
  reducer = ShowsReducer,
  initialState = [],
  key = 'Shows'
) {
  const [state, dispatch] = useReducer(reducer, initialState, initial => {
    const persisted = localStorage.getItem(key);
    return persisted ? JSON.parse(persisted) : initial;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, dispatch];
}
export function useShows(key = 'shows') {
  return usePersistedReducer(ShowsReducer, [], key);
}

// below code is for home.js it uses a useState with initialiser function to initialise the current state with the data in session storage data
export function useLastQuery(key = 'lastQuery') {
  const [input, setinput] = useState(() => {
    const persisted = sessionStorage.getItem(key);
    return persisted ? JSON.parse(persisted) : '';
  });
  const setPersistedInput = newState => {
    setinput(newState);
    sessionStorage.setItem(key, JSON.stringify(newState));
  };
  return [input, setPersistedInput];
}

// the below code is a merge of useReducer and useEffect for the shows.js file

export function useShow(showId) {
  const initialState = {
    Show: null,
    isLoading: true,
    Error: null,
  };
  const reducer = (prevState, action) => {
    switch (action.type) {
      case 'FETCH_SUCCESS': {
        return { isLoading: false, Show: action.Show, Error: null };
      }
      case 'FETCH_FAILED': {
        return { ...prevState, isLoading: false, Error: action.Error };
      }

      default:
        return prevState;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let isMounted = true;
    apiGet(`/shows/${showId}?embed[]=seasons&embed[]=cast`)
      .then(results => {
        if (isMounted) {
          dispatch({ type: 'FETCH_SUCCESS', Show: results });
        }
      })
      .catch(err => {
        if (isMounted) {
          dispatch({ type: 'FETCH_FAILED', error: err.mesage });
        }
      });

    return () => {
      isMounted = false;
    };
  }, [showId]);

  return state;
}
