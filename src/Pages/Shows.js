/* eslint-disable no-underscore-dangle */
import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { apiGet } from '../misc/config';
import ShowMainData from '../Components/Show/ShowMainData';
import Details from '../Components/Show/Details';
import Seasons from '../Components/Show/Seasons';
import Cast from '../Components/Show/Cast';
import { InfoBlock, ShowPageWrapper } from '../Components/Show/Show.Styled';

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

  if (isLoading) {
    return <div> Data is being loaded</div>;
  }
  if (Error) {
    return <div> Error occured :{Error} </div>;
  }
  return (
    <ShowPageWrapper>
      <ShowMainData
        image={Show.image}
        name={Show.name}
        rating={Show.rating}
        summary={Show.summary}
        tags={Show.genres}
      />
      <InfoBlock>
        <h2> Details : </h2>
        <Details
          status={Show.status}
          network={Show.network}
          premiered={Show.premiered}
        />
      </InfoBlock>
      <InfoBlock>
        <h2> Seasons </h2>
        <Seasons seasons={Show._embedded.seasons} />
      </InfoBlock>
      <InfoBlock>
        <h2>Cast: </h2>
        <Cast cast={Show._embedded.cast} />
      </InfoBlock>
    </ShowPageWrapper>
  );
};

export default Shows;
