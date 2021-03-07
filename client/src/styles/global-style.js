import { createGlobalStyle } from 'styled-components';
import theme from 'styles/theme';

// Some of these defaults were taken from my personal website:
// https://github.com/rustom-ichhaporia/gatsby-fresh
const GlobalStyle = createGlobalStyle`
  :root {
    --white: #ffffff;
    --cream: #f0f0f0;
    --red: #f04646;
    --dark-red: #c72424;
    --peach: #ffa984;
    --peach-2: #ff8e5e;
    --dark-peach: #b86440;
    --blue: #4287f5;
    --grey-4: #cccccc;
    --grey-3: #888888;
    --grey-2: #444444;
    --grey-1: #151515;
    --black: #000000;
    --dark-blue: #001824;
  }

  body {
    margin: 0;
    padding: 0;    
    background: ${theme.colors.grey1};
    font-family: ${theme.sansFonts};
    color: ${theme.colors.grey3};
    font-size: 20px;
    line-height: 1.5em;
    * {
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
        color: ${theme.colors.grey4};
      }
    }
  }
}
`;

export default GlobalStyle;
