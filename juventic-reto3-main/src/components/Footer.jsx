import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebookF, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className='footer pt-0 pb-3 bg-0'>
      <div className='container padding-0'>
        <div className='mb-4'>
          <ul className='navbar-nav text-uppercase ms-auto py-lg-0 nav-bottom'>
            <li className='nav-item weigth-120'>
              <Link className='nav-link weigth-120' to='/'>
                <p className='stroke weigth-120'>Inicio</p>
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/about'>
                <p className='stroke weigth-120'>Equipo</p>{' '}
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/menu'>
                <p className='stroke weigth-120'>Menu</p>{' '}
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/services'>
                <p className='stroke weigth-120'>Servicios</p>{' '}
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/contact'>
                <p className='stroke weigth-120'>Contactanos</p>{' '}
              </Link>
            </li>
          </ul>
        </div>
        <div className='row align-items-center justify-content-center '>
          <div className='col-lg-4 text-lg-start'>Copyright &copy; Pane e pasta colombiani @Kevin_Huaza - @v.devalen - @V_David @juandavidsotoc</div>
          <div className='col-lg-4 my-3 my-lg-0'>
            <Link className='btn btn-dark btn-social mx-2' to='#'>
              <FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon>
            </Link>
            <Link className='btn btn-dark btn-social mx-2' to='#'>
              <FontAwesomeIcon icon={faFacebookF}></FontAwesomeIcon>
            </Link>
            <Link className='btn btn-dark btn-social mx-2' to='#'>
              <FontAwesomeIcon icon={faLinkedinIn}></FontAwesomeIcon>
            </Link>
          </div>
          <div className='col-lg-4 text-lg-end'>
            <Link className='link-dark text-decoration-none me-3' to='#'>
              Politica y privacidad
            </Link>
            <Link className='link-dark text-decoration-none' to='#'>
              Terminos de uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
