import React from 'react';
import styled from 'styled-components';
import { GlobalStyle, theme } from '../styles';
import { Navigation } from 'components';

const PageWrapper = styled.div`
`;

const Wrapper = styled.div`
  min-height: 100vh;
  margin: 0 auto;
  margin-left: ${theme.navigationWidth};
  padding: 100px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

`;

export default function Layout({ children }) {
  return (
    <PageWrapper>
      <GlobalStyle />
      <Navigation />
      <Wrapper>{children}</Wrapper>
    </PageWrapper>
  );
}
