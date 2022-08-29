import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { apiGet } from '../misc/config';

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
const initialState = {
  Show: null,
  isLoading: true,
  Error: null,
};
const Shows = () => {
  const { id } = useParams();

  const [{ Show, isLoading, Error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    let isMounted = true;
    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
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
  }, [id]);
  console.log(Show);

  if (isLoading) {
    return <div> Data is being loaded</div>;
  }
  if (Error) {
    return <div> Error occured :{Error} </div>;
  }
  return <div> This page will show you details about the show </div>;
};

export default Shows;
