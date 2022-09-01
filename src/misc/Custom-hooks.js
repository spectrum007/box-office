import { useReducer, useEffect } from 'react';

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

export function usePersistedReducer(
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
// export function useShows(key = 'shows') {
//   return usePersistedReducer(ShowsReducer, [], key);
// }
