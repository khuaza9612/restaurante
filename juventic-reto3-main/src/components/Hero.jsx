import React from 'react';

const Hero = ({ title }) => {
  return (
    <>
      <header className='masthead'>
        <div className='container'>
          <div className='masthead-subheading'>{title.toUpperCase()}</div>
          <div className='masthead-heading text-uppercase'>Pane e pasta colombiani</div>
        </div>
      </header>
    </>
  );
};

export default Hero;
