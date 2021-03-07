import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Button, ExternalLink, Layout, Profile } from 'components';

export default function Home() {
  return (
    <Layout>
      <Profile />
      <p>The home page.</p>
      <Link to="playlist">Go somewhere special, cutie.</Link>
      <Button>
        <ExternalLink destination="https://github.com/rustom">
          <p>LOGIN</p>
        </ExternalLink>
      </Button>
    </Layout>
  );
}
