import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getDefaultProfile } from 'api';

import { Button, ExternalLink, Layout, Profile } from 'components';

export default function Home() {
  const [profileData, setProfileData] = React.useState({});

  React.useEffect(async () => {
    await getDefaultProfile('shidoarichimorin', setProfileData);
  }, []);

  return (
    <Layout>
      <Profile data={profileData} />
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
