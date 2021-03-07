import React from 'react';
import styled from 'styled-components';

export default function ExternalLink({ destination, children }) {
  return (
    <a
      href={destination}
      aria-label="Link to GitHub repo"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
