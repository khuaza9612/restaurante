import React, { useState } from 'react';
import { useCartContext } from '../contexts/cartContext';

import Modal from './Modal';
import Form from './Form';

const Cart = () => {
  const context = useCartContext();
  const [showModal, setShowModal] = useState(false);

  const sendEmail = () => {
    setShowModal(!showModal);
  };

  if (context.cart.length === 0) {
    return (
      <>
        <div className='cart my-2'>
          <h4 className='text-danger text-center'>Aún no has añadido platos</h4>
        </div>
      </>
    );
  }

  return (
    <>
      <div className='bg-dark p-2 d-flex justify-content-center w-100'>
        <h2 className='text-light'>Tus Platos</h2>
      </div>
      <div className='cart'>
        {context.cart.map((item) => (
          <div key={item.id} className='cart-item'>
            <img className='cart-img' src={item.img} alt={item.name} />
            <div>
              <p>{item.name.toUpperCase()}</p>
              <p>${item.price}</p>
            </div>
            <div>
              <button className='amount-btn' onClick={() => context.increment(item.id)}>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
                  <path d='M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z'></path>
                </svg>
              </button>
              <p className='amount'>{item.qty}</p>
              <button className='amount-btn' onClick={() => context.decrement(item.id)}>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
                  <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z'></path>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
      <hr />
      <div className='d-flex justify-content-around text-start'>
        <p>
          Total <span className='text-danger'>${context.total}</span>
        </p>
      </div>
      <div className='d-flex my-4 justify-content-center'>
        <button onClick={() => context.clear()} className='text-dark btn btn-danger me-4'>
          Vaciar carrito
        </button>
        <button onClick={sendEmail} className='text-dark btn btn-warning ml-4'>
          Enviar pedido
        </button>
      </div>

      {showModal && (
        <Modal isOpen={setShowModal} title={`Enviar pedido`}>
          <div className='modal-content'>
            <Form
              type='cart'
              text={'Enviar'}
              payload={{
                name: '',
                email: '',
              }}
              isOpen={setShowModal}
            ></Form>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Cart;
