import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faFire, faHamburger } from '@fortawesome/free-solid-svg-icons';

import { useLoginContext } from '../contexts/loginContext';
import Dish from '../components/Dish';
import Form from '../components/Form';
import Hero from '../components/Hero';
import Modal from '../components/Modal';
import URL from '../server';

const Menu = () => {
  const {
    client: { isAdmin }
  } = useLoginContext();

  const [loading, setLoading] = useState(true);
  const [dishes, setDishes] = useState([]);
  const [isButtonOpen, setIsButtonOpen] = useState(false);

  const fetchMenu = async () => {
    setLoading(true);
    const res = await fetch(`${URL}/menu`);
    const menu = await res.json();
    setDishes(menu);
    setLoading(false);
  };

  const createDish = dish => {
    axios
      .post(`${URL}/menu`, dish)
      .then(({ data }) => setDishes([...dishes, data]))
      .catch(console.log);
  };

  const updateDish = dish => {
    axios
      .patch(`${URL}/menu/${dish.id}`, dish)
      .then(({ data }) => setDishes(prev => prev.map(dish => (dish.id === data.id ? data : dish))))
      .catch(console.log);
  };

  const deleteDish = dish => {
    axios
      .delete(`${URL}/menu/${dish.id}`)
      .then(({ data }) => setDishes(dishes.filter(d => d.id !== dish.id)))
      .catch(console.log);
  };

  useEffect(() => {
    window.scrollTo({ top: true });
    fetchMenu();
  }, []);

  return (
    <>
      <Hero title='nuestro menú'></Hero>
      <div className='py-4' style={{ background: '#b95a00' }}>
        <div className='container'>
          <div className='d-flex flex-column flex-lg-row justify-content-around text-center text-light'>
            <div>
              <FontAwesomeIcon icon={faUtensils} color='black' size='2x'></FontAwesomeIcon>
              <p>¡Explora los nuevos platillos de nuestro restaurante! más de 100 platillos diferentes</p>
            </div>
            <div>
              <FontAwesomeIcon icon={faFire} color='black' size='2x'></FontAwesomeIcon>
              <p>Chefs expertos Prueba las nuevas combinaciones</p>
            </div>
            <div>
              <FontAwesomeIcon icon={faHamburger} color='black' size='2x'></FontAwesomeIcon>
              <p>Bebidas ilimitadas ¡Ven y disfruta de tú bebida favorita en cualquier momento!</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ background: '#1d2124', textAlign: 'center' }}>
        <div className='mb-4'>
          <h2 className='text-light'>Menú</h2>
          <a href='assets/MenuPaneyPastaColombiani.pdf' id='carta' download='MenuPaneyPastaColombianim,' className='text-black btn btn-primary'>
            Descarga nuestro menú
          </a>
        </div>

        <div className='container'>
          <div className='row'>
            {loading ? (
              <div className='d-flex justify-content-center'>
                <div className='spinner-border' role='status'>
                  <span className='visually-hidden'>Loading...</span>
                </div>
              </div>
            ) : (
              dishes.map(dish => {
                return <Dish key={dish.id} dish={dish} updateDish={updateDish} deleteDish={deleteDish}></Dish>;
              })
            )}
          </div>
        </div>
      </div>

      {isAdmin && (
        <button className='admin-create-btn btn btn-secondary' onClick={() => setIsButtonOpen(!isButtonOpen)}>
          Agregar nuevo plato
        </button>
      )}

      {isButtonOpen && (
        <Modal isOpen={setIsButtonOpen} title={`Crea un nuevo plato`}>
          <div className='modal-content'>
            <Form
              payload={{
                name: '',
                description: '',
                price: 1,
                img: ''
              }}
              text={'crear'}
              action={createDish}
              isOpen={setIsButtonOpen}
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export default Menu;
