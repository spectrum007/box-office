import React from 'react';
import Navs from './Navs';
import Title from './Title';

const MainPageLayout = ({ children, isShows }) => {
  const showsActive = isShows === 'shows';
  return (
    <div>
      <Title
        isShows={showsActive}
        title="Box-Office"
        subtitle="Are you looking for a Show or Actor /Actress?"
      />
      <Navs />
      {children}
    </div>
  );
};

export default MainPageLayout;
