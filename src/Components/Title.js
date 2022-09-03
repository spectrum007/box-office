import React from 'react';
import { TitleWrapper } from './TitleStyled';

const Title = ({ title, subtitle, isShows }) => {
  return (
    <TitleWrapper>
      <h1 className={isShows ? 'shows' : ''}>{title}</h1>
      <p> {subtitle}</p>
    </TitleWrapper>
  );
};

export default Title;
