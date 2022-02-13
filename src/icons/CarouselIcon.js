import React from 'react';
import Icon from '@ant-design/icons';

const CarouselSvg = () => (
  <svg viewBox="0 0 24 24" width="16" height="16">
    <path fill="none" d="M0 0h24v24H0z"/>
    <path 
      d="M13 21v2h-2v-2H3a1 1 0 0 1-1-1V6h20v14a1 1 0 0 1-1 1h-8zm-9-2h16V8H4v11zm9-9h5v2h-5v-2zm0 4h5v2h-5v-2zm-4-4v3h3a3 3 0 1 1-3-3zM2 3h20v2H2V3z" 
      fill="currentColor"
    />
  </svg>
);

export default function CarouselIcon(props) {
  return (
    <Icon component={CarouselSvg} {...props} />
  );
}

