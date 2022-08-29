import React from 'react';
import ActorCards from './ActorCards';
import ImageNotFound from '../../Images/not-found.png';
import { FlexGrid } from '../Styled';

const ActorGrid = ({ data }) => {
  return (
    <FlexGrid>
      {data.map(({ person }) => (
        <ActorCards
          key={person.id}
          name={person.name}
          country={person.country ? person.country.name : null}
          birthday={person.birthday}
          deathday={person.deathday}
          gender={person.gender}
          image={person.image ? person.image.medium : ImageNotFound}
          summary={person.summary}
        />
      ))}
    </FlexGrid>
  );
};

export default ActorGrid;
