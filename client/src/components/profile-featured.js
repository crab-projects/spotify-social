import React from 'react';
import styled from 'styled-components';

import { theme } from 'styles';
import logo from 'assets/spotify-logo.png';
import { Graph } from 'components';

const FeaturedSection = styled.div`
  // max-height: 500px;
  // height: 300px;
`;

const TitleSection = styled.div`
  height: 200px;
  padding-left: 50px;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const TopArtists = styled.div`
  // padding-left: 30px;
`;

const TopArtistsTitle = styled.p``;

const ArtistItem = styled.div`
  margin: 20px 0px;
`;

const ArtistPicture = styled.img`
  width: 60px;
  height: 60px;
  float: left;
`;

const ArtistNameBox = styled.div`
  height: 60px;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ArtistName = styled.p``;

export default function ProfileFeatured({ data }) {
  return (
    <FeaturedSection>
      <Graph
        styleObj={{
          width: '800px',
          height: '400px',
          float: 'left',
          paddingRight: '100px',
        }}
      />
      <TopArtists>
        <TopArtistsTitle>Top Artists</TopArtistsTitle>
        <ArtistItem>
          <ArtistPicture src={logo} />
          <ArtistNameBox>
            <ArtistName>{data.artists && data.artists[0]}</ArtistName>
          </ArtistNameBox>
        </ArtistItem>
        <ArtistItem>
          <ArtistPicture src={logo} />
          <ArtistNameBox>
            <ArtistName>{data.artists && data.artists[1]}</ArtistName>
          </ArtistNameBox>
        </ArtistItem>
        <ArtistItem>
          <ArtistPicture src={logo} />
          <ArtistNameBox>
            <ArtistName>{data.artists && data.artists[2]}</ArtistName>
          </ArtistNameBox>
        </ArtistItem>
        <ArtistItem>
          <ArtistPicture src={logo} />
          <ArtistNameBox>
            <ArtistName>{data.artists && data.artists[3]}</ArtistName>
          </ArtistNameBox>
        </ArtistItem>
        <ArtistItem>
          <ArtistPicture src={logo} />
          <ArtistNameBox>
            <ArtistName>{data.artists && data.artists[4]}</ArtistName>
          </ArtistNameBox>
        </ArtistItem>
      </TopArtists>
    </FeaturedSection>
  );
}
