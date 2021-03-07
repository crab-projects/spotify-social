import React from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';
import { Layout } from 'components';

export default function NotFound() {
  return (
    <Layout>
      <p>Error 404, or something.</p>
      <Link to="/">
        We couldn't find what you were looking for, our bad. Unless you're
        intentionally trying to go to something that doesn't exist, in which
        case, it's your bad.
      </Link>
    </Layout>
  );
}
