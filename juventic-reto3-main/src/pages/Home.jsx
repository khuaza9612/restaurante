import React, { useEffect } from 'react';

import Hero from '../components/Hero';
import Carrousel from '../components/Carrousel';
import Clients from '../components/Clients';

const Home = () => {
  useEffect(() => {
    window.scrollTo({ top: true });
  }, []);

  return (
    <>
      <Hero title='¡bienvenidos a nuestro restaurante!'></Hero>
      <Carrousel></Carrousel>
      <Clients></Clients>
    </>
  );
};

export default Home;
