import { createGlobalStyle } from 'styled-components';
import theme from 'styles/theme';

// Some of these defaults were taken from my personal website:
// https://github.com/rustom-ichhaporia/gatsby-fresh
const GlobalStyle = createGlobalStyle`
  :root {
  }

  body {
    margin: 0;
    padding: 0;    
    background: ${theme.colors.grey1};
    line-height: 1.5em;
    color: ${theme.colors.grey3};
    
    * {
      font-size: 20px;
      font-family: ${theme.sansFonts};
      font-weight: 500;
    }

    // overflow: hidden;
    overflow-y: scroll;

    // Hide scrollbar in multiple browsers
    scrollbar-width: none;
    -ms-overflow-style: none;
    ::-webkit-scrollbar {
      width: 0;
      height: 0;
    }

    a {
      text-decoration: none;
      color: inherit;
      :link {
        color: ${theme.colors.grey3};
      }
      :visited {
        color: ${theme.colors.grey3};
      }
      :hover {
        color: ${theme.colors.white};
      }
      :active {
        color: ${theme.colors.white};
      }
    }
  }
}
`;

export default GlobalStyle;
