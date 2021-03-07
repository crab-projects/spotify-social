import React from 'react';
import styled from 'styled-components';

import { theme } from 'styles';

const ButtonBox = styled.button`
  background-color: transparent;
  border: 2px solid ${theme.colors.white};
  border-radius: 200px;
  width: fit-content;
  padding: 0px 30px;
  outline: none;

  color: ${theme.colors.white} !important;

  a {
    color: ${theme.colors.white} !important;
  }

  &:hover, &:focus {
    color: ${theme.colors.black}! important;
    a {
      color: ${theme.colors.black} !important;
    }
    background: ${theme.colors.white};
  }
`;

export default function Button({ onClick, children }) {
  return <ButtonBox onClick={onClick}>{children}</ButtonBox>;
}
