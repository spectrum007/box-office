import React from 'react';
import ShowCard from './ShowCard';
import ImageNotFound from '../../Images/not-found.png';
import { FlexGrid } from '../Styled';
import { useShows } from '../../misc/Custom-hooks';

const ShowGrid = ({ data }) => {
  const [starredShows, DispatchStarred] = useShows();

  return (
    <FlexGrid>
      {data.map(({ show }) => {
        const isStarred = starredShows.includes(show.id);

        const onStarClick = () => {
          if (isStarred) {
            DispatchStarred({ type: 'Remove', showId: show.id });
          } else {
            DispatchStarred({ type: 'Add', showId: show.id });
          }
        };
        return (
          <ShowCard
            key={show.id}
            id={show.id}
            name={show.name}
            image={show.image ? show.image.medium : ImageNotFound}
            summary={show.summary}
            onStarClick={onStarClick}
            isStarred={isStarred}
          />
        );
      })}
    </FlexGrid>
  );
};

export default ShowGrid;
