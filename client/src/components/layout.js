import React from 'react';
import styled from 'styled-components';
import { GlobalStyle, theme } from '../styles';
import { Navigation } from 'components';

const PageWrapper = styled.div``;

const Wrapper = styled.div`
  min-height: 100vh;
  margin: 0 auto;
  margin-left: ${theme.navigationWidth};
  padding: 100px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const WrapperFade = styled.div`
  height: 200px;
  background-image: linear-gradient(
    to bottom,
    ${theme.colors.grey2},
    ${theme.colors.grey1}
  );
`;

export default function Layout({ children }) {
  return (
    <PageWrapper>
      <GlobalStyle />
      <WrapperFade>
        <Navigation />
        <Wrapper>{children}</Wrapper>
      </WrapperFade>
    </PageWrapper>
  );
}
