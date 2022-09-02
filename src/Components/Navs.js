import React from 'react';
import { useLocation } from 'react-router';
import { LinkStyled, NavList } from './NavsStyled';

const Links = [
  { to: '/', text: 'Home' },
  { to: '/starred', text: 'Starred' },
];

const Navs = () => {
  const location = useLocation();
  return (
    <div>
      <NavList>
        {Links.map(items => (
          <li key={items.to}>
            <LinkStyled
              to={items.to}
              className={items.to === location.pathname ? 'active' : ''}
            >
              {items.text}
            </LinkStyled>
          </li>
        ))}
      </NavList>
    </div>
  );
};

export default Navs;
