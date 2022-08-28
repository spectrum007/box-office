import React from 'react';
import ActorCards from './ActorCards';
import ImageNotFound from '../../Images/not-found.png';

const ActorGrid = ({ data }) => {
  return (
    <div>
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
    </div>
  );
};

export default ActorGrid;
