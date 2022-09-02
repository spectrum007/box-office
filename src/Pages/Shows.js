/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useParams } from 'react-router-dom';
import ShowMainData from '../Components/Show/ShowMainData';
import Details from '../Components/Show/Details';
import Seasons from '../Components/Show/Seasons';
import Cast from '../Components/Show/Cast';
import { InfoBlock, ShowPageWrapper } from './Show.Styled';
import { useShow } from '../misc/Custom-hooks';

const Shows = () => {
  const { id } = useParams();

  const { Show, isLoading, Error } = useShow(id);

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
