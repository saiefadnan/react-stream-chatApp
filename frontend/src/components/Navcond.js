import React from 'react';
import { useLocation } from 'react-router-dom';
import Navcomp from './Navcomp';

const ConditionalNavcomp = () => {
  const location = useLocation();

  // Conditionally render Navcomp based on the current path
  const shouldRenderNavcomp = location.pathname !== '/chat';

  return (
    <>
      {shouldRenderNavcomp && <Navcomp />}
      {/* The content of the current route will be rendered here */}
    </>
  );
};

export default ConditionalNavcomp;
