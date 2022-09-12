import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  useEffect(() => {
    window.scrollTo({ top: true });
  }, []);

  return (
    <div className='d-flex flex-column align-items-center'>
      <h1>la página que buscas no existe</h1>
      <button className='btn btn-primary'>
        <Link className='text-black text-decoration-none' to='/'>
          volver a inicio
        </Link>
      </button>
    </div>
  );
};

export default Error;
