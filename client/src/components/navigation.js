import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { ExternalLink } from 'components';
import { theme } from 'styles';
import logoPic from 'assets/spotify-logo.png';

const NavBackground = styled.div`
  position: fixed;
  left: 0px;
  height: 100vh;
  width: ${theme.navigationWidth};
  background: ${theme.colors.black};

  padding: 50px 0px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const LogoBox = styled.div`
  max-width: calc(${theme.navigationWidth} / 2.5);
  margin: 0px auto;
`;

const LogoImg = styled.img`
  max-width: calc(${theme.navigationWidth} / 2.5);
`;

const PageLinks = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px auto;
`;

const ReferenceLinks = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px auto;
`;

const PageLink = styled.p``;

export default function Navigation() {
  return (
    <NavBackground>
      <LogoBox>
        <Link to="/">
          <LogoImg src={logoPic} />
        </Link>
      </LogoBox>

      <PageLinks>
        <Link to="playlist">
          <PageLink>Playlist</PageLink>
        </Link>

        <Link to="something">
          <PageLink>Error page</PageLink>
        </Link>

        <Link to="something">
          <PageLink>Something else</PageLink>
        </Link>
      </PageLinks>

      <ReferenceLinks>
        <ExternalLink destination="https://github.com/crab-projects">
          Our GitHub
        </ExternalLink>
      </ReferenceLinks>
    </NavBackground>
  );
}
