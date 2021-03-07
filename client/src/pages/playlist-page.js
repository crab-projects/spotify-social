import React from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';
import { Layout } from 'components';

export default function PlaylistPage() {
  return (
    <Layout>
      <p>The Playlist page.</p>
      <Link to="/">Sweet Home Alabama.</Link>
    </Layout>
  );
}
