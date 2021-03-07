import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Layout } from '../components';

export default function Home() {
  return (
    <Layout>
      <p>The home page.</p>
      <Link to="playlist">Go somewhere special, cutie.</Link>
    </Layout>
  );
}
