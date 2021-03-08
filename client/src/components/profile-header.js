import React from 'react';
import styled from 'styled-components';

import { theme } from 'styles';
import logoPic from 'assets/spotify-logo.png';

const HeaderSection = styled.div`
  max-height: 500px;
`;

const TitleSection = styled.div`
  height: 200px;
  padding-left: 50px;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProfilePicture = styled.img`
  width: 200px;
  float: left;
  border-radius: 300px;
`;

const DisplayName = styled.p`
  color: ${theme.colors.white};
  font-size: 60px;
  margin: 0;
`;

const TitleText = styled.p`
  margin: 0;
`;

const TitleDetails = styled.p`
  margin: 0;
`;

export default function ProfileHeader({ data }) {
  return (
    <HeaderSection>
      <ProfilePicture src={data.profileImageUrl} />
      <TitleSection>
        <TitleText>
          {/* PROFILE  */}
          {data.username}
        </TitleText>
        <DisplayName>{data.displayName}</DisplayName>
        <TitleDetails>
          {data.numPlaylists} Public Playlists · {data.numFollowers} Followers ·{' '}
          {data.numFollowing} Following
        </TitleDetails>
      </TitleSection>
    </HeaderSection>
  );
}
