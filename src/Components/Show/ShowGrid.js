import React from 'react';
import ShowCard from './ShowCard';
import ImageNotFound from '../../Images/not-found.png';
import { FlexGrid } from '../Styled';

const ShowGrid = ({ data }) => {
  return (
    <FlexGrid>
      {data.map(({ show }) => (
        <ShowCard
          key={show.id}
          id={show.id}
          name={show.name}
          image={show.image ? show.image.medium : ImageNotFound}
          summary={show.summary}
        />
      ))}
    </FlexGrid>
  );
};

export default ShowGrid;
