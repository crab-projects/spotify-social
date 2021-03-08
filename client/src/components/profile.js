import React from 'react';
import styled from 'styled-components';

import { ProfileFeatured, ProfileHeader } from 'components';
import { theme } from 'styles';
import logoPic from 'assets/spotify-logo.png';

const ProfileWrapper = styled.div``;

export default function Profile({ data }) {
  console.log(data);
  return (
    <ProfileWrapper>
      <ProfileHeader data={data} />
      <ProfileFeatured data={data} />
      {/* <ProfilePlaylists data={data} /> */}
    </ProfileWrapper>
  );
}
