import React, { useState } from 'react';
import { useCartContext } from '../contexts/cartContext';
import { useLoginContext } from '../contexts/loginContext';

import Modal from './Modal';
import Form from './Form';

const Dish = ({ dish, updateDish, deleteDish }) => {
  const { addToCart } = useCartContext();
  const {
    client: { isAdmin }
  } = useLoginContext();

  const [isEditing, setIsEditing] = useState(false);
  const [state, setState] = useState(dish);

  const update = dish => {
    updateDish(dish);
    setState(dish);
  };

  const del = dish => {
    deleteDish(dish);
  };

  return (
    <>
      <div className='col-12 col-md-6 col-xl-4 mb-4'>
        <div className='card text-light text-center' style={{ background: '#212529' }}>
          <img className='card-img-top dish-img' src={state.img} alt={state.name} />
          <div className='card-body'>
            <h5 className='card-title'>{state?.name}</h5>
            <p className='card-text'>{state?.description}</p>
            <h5>${state?.price}</h5>
            <button onClick={() => addToCart(dish)} className='btn btn-primary w-100 text-black'>
              Agregar al carrito
            </button>
            {isAdmin && (
              <>
                <button className='mt-2 mx-auto w-100 d-block btn btn-secondary' onClick={() => setIsEditing(!isEditing)}>
                  editar
                </button>
                <button className='mt-2 mx-auto w-100 d-block btn btn-danger' onClick={() => del(dish)}>
                  eliminar
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      {isEditing && (
        <Modal isOpen={setIsEditing} title={`editando a ${state.name}`}>
          <div className='modal-content'>
            <Form payload={state} action={update} isOpen={setIsEditing}></Form>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Dish;
