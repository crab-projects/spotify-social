import React from 'react';
import styled from 'styled-components';

import { theme } from 'styles';
import logoPic from 'assets/spotify-logo.png';

const ProfileWrapper = styled.div``;

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

const ProfilePic = styled.img`
  width: 200px;
  float: left;
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

export default function Profile({data}) {
  console.log(data);
  return (
    <ProfileWrapper>
      <HeaderSection>
        <ProfilePic src={logoPic} />
        <TitleSection>
          <TitleText>
            PROFILE {data.numFollowers}
          </TitleText>
          <DisplayName>Rustom Ichhaporia</DisplayName>
          <TitleDetails>
            4 Public Playlists · 69 Followers · 420 Following
          </TitleDetails>
        </TitleSection>
      </HeaderSection>
    </ProfileWrapper>
  );
}
