import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import { useCartContext } from '../contexts/cartContext';
import { useLoginContext } from '../contexts/loginContext';
import Cart from '../components/Cart';
import Login from '../components/Login';
import Modal from './Modal';
import Register from './Register';
import URL from '../server';

const Header = () => {
  const { quantity } = useCartContext();
  const {
    client,
    client: { isAdmin },
    setClient
  } = useLoginContext();

  const [toggleCart, setToggleCart] = useState(false);
  const [toggleLogin, setToggleLogin] = useState(false);
  const [toggleRegister, setToggleRegister] = useState(false);
  const [toggleReservas, setToggleReservas] = useState(false);
  const [reservas, setReservas] = useState([]);

  const fetchAllReservas = () => {
    axios
      .get(`${URL}/reserva`)
      .then(({ data }) => {
        setReservas(data);
      })
      .then(() => setToggleReservas(!toggleReservas));
  };

  const fetchReservas = () => {
    axios
      .get(`${URL}/reserva/${client.id}`)
      .then(({ data }) => {
        setReservas(data);
      })
      .then(() => setToggleReservas(!toggleReservas));
  };

  const completarReserva = id => {
    setReservas(reservas.map(reserva => (reserva.id === id ? { ...reserva, state: 'realizado' } : reserva)));
    axios.patch(`${URL}/reserva/${id}`);
  };

  const cancelarReserva = id => {
    setReservas(reservas.map(reserva => (reserva.id === id ? { ...reserva, state: 'cancelado' } : reserva)));
    axios.delete(`${URL}/reserva/${id}`);
  };

  return (
    <>
      <nav className='navbar navbar-expand-lg navbar-light bg-dark navbar-shrink fixed-top'>
        <div className='container'>
          <Link className='navbar-brand text-warning' to='/'>
            {isAdmin ? 'Panel de administrador' : client.id ? client.username : 'Pane e pasta colombiani'}
          </Link>
          <div>
            <button
              className='navbar-toggler'
              style={{ backgroundColor: 'white' }}
              type='button'
              data-bs-toggle='offcanvas'
              data-bs-target='#offcanvasNavbar'
              aria-controls='offcanvasNavbar'
            >
              <span className='navbar-toggler-icon'></span>
            </button>
          </div>
          <div className='bg-dark offcanvas offcanvas-end' tabIndex='-1' id='offcanvasNavbar' aria-labelledby='offcanvasNavbarLabel'>
            <div className='offcanvas-header'>
              <h5 className='offcanvas-title text-warning' id='offcanvasNavbarLabel'>
                Pane e pasta colombiani
              </h5>
              <button type='button' className='btn-close text-reset bg-light' data-bs-dismiss='offcanvas' aria-label='Close'></button>
            </div>
            <div className='offcanvas-body'>
              <ul className='navbar-nav justify-content-end flex-grow-1 pe-3'>
                <li className='nav-item ' data-bs-dismiss='offcanvas'>
                  <Link className='nav-link' to='/'>
                    <p className='stroke text-light'>Inicio</p>
                  </Link>
                </li>
                <li className='nav-item' data-bs-dismiss='offcanvas'>
                  <Link className='nav-link' to='/about'>
                    <p className='stroke text-light'>Equipo</p>
                  </Link>
                </li>
                <li className='nav-item' data-bs-dismiss='offcanvas'>
                  <Link className='nav-link' to='/menu'>
                    <p className='stroke text-light'>Menú</p>
                  </Link>
                </li>
                <li className='nav-item' data-bs-dismiss='offcanvas'>
                  <Link className='nav-link' to='/services'>
                    <p className='stroke text-light'>Servicios</p>
                  </Link>
                </li>
                <li className='nav-item' data-bs-dismiss='offcanvas'>
                  <Link className='nav-link' to='/contact'>
                    <p className='stroke text-light'>Reservar</p>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className='nav-item ml-5'>
            {client.id ? (
              <>
                <button type='button' className='btn btn-primary' onClick={() => setClient({})}>
                  Logout
                </button>
                <button
                  type='button'
                  className='btn btn-success'
                  onClick={() => {
                    isAdmin ? fetchAllReservas() : fetchReservas();
                  }}
                >
                  {isAdmin ? 'Reservas' : 'Mis reservas'}
                </button>
              </>
            ) : (
              <>
                <button type='button' className='btn btn-primary' onClick={() => setToggleLogin(!toggleLogin)}>
                  Login
                </button>
                <button type='button' className='btn btn-secondary' onClick={() => setToggleRegister(!toggleRegister)}>
                  Registrate
                </button>
              </>
            )}
          </div>
          <button className='d-flex mx-2 btn btn-outline-warning align-items-center' onClick={() => setToggleCart(!toggleCart)}>
            <FontAwesomeIcon icon={faShoppingCart} color='yellow' size='2x'></FontAwesomeIcon>
            <h5>{quantity !== 0 && quantity}</h5>
          </button>
        </div>
      </nav>
      {toggleCart && (
        <Modal fullWidth={false} isOpen={setToggleCart} title={`carrito de compras`}>
          <div className='modal-content'>
            <Cart isOpen={setToggleCart}></Cart>
          </div>
        </Modal>
      )}
      {toggleLogin && (
        <Modal isOpen={setToggleLogin} title={`Ingresa`}>
          <div className='modal-content'>
            <Login isOpen={setToggleLogin} />
          </div>
        </Modal>
      )}
      {toggleRegister && (
        <Modal isOpen={setToggleRegister} title={`Registrate`}>
          <div className='modal-content'>
            <Register isOpen={setToggleRegister} />
          </div>
        </Modal>
      )}
      {toggleReservas && (
        <Modal isLarge={true} isOpen={setToggleReservas} title={`Tus reservas`}>
          <div className='modal-content'>
            {!reservas.length ? (
              <p className='text-danger h2'>No tienes reservas</p>
            ) : (
              <div class='table-responsive'>
                <table className='table'>
                  <thead>
                    <tr>
                      <th scope='col'>#</th>
                      <th scope='col'>Reserva</th>
                      <th scope='col'>Cliente</th>
                      <th scope='col'>Fecha</th>
                      <th scope='col'>Estado</th>
                      <th scope='col'>{isAdmin ? 'Terminar' : 'Cancelar'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservas.map((reserva, index) => {
                      return (
                        <tr key={index}>
                          <th scope='row'>{index + 1}</th>
                          <td>{reserva.servicio.name.toUpperCase()}</td>
                          <td>{reserva.cliente.name}</td>
                          <td>{moment.utc(reserva.date).format('DD-MM-YYYY hh:mm A')}</td>
                          <td>{reserva.state}</td>
                          <td>
                            {isAdmin ? (
                              <button disabled={reserva.state !== 'en espera'} className='btn btn-success' onClick={() => completarReserva(reserva.id)}>
                                Realizado
                              </button>
                            ) : (
                              <button disabled={reserva.state !== 'en espera'} className='btn btn-danger' onClick={() => cancelarReserva(reserva.id)}>
                                Cancelar
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </Modal>
      )}
    </>
  );
};

export default Header;
