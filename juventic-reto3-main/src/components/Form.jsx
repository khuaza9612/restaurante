import React, { useState } from 'react';
import { useCartContext } from '../contexts/cartContext';

const Form = ({ payload, isOpen, action, text = 'actualizar', type }) => {
  const { cart, total, quantity } = useCartContext();

  const [form, setForm] = useState(payload);

  const onChange = e => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleOnSubmit = async e => {
    e.preventDefault();
    action(form);
    isOpen(false);
  };

  if (type === 'cart') {
    return (
      <>
        <form security='off' autoComplete='off' action='https://formspree.io/f/xbjqbgko' method='POST'>
          <input type='hidden' name='_language' value='es' />
          <input type='hidden' name='_subject' value='Pane e pasta Colombiani' />
          <div className='form-floating'>
            <input className='form-control' type='text' value={form.name} autoFocus name='name' required onChange={onChange} />
            <label htmlFor='floatingInputValue'>Nombre</label>
          </div>
          <div className='form-floating'>
            <input className='form-control' type='email' value={form.email} name='email' required onChange={onChange} />
            <label htmlFor='floatingInputValue'>Email</label>
          </div>
          <div className='form-check'>
            <input className='form-check-input' type='checkbox' value='' id='flexCheckDefault' required />
            <label className='form-check-label' htmlFor='flexCheckDefault'>
              Al hacer clic en "Enviar", aceptas nuestras Condiciones, la Política de datos y la Política de cookies.Es posible que te enviemos notificaciones por SMS,
              que puedes desactivar cuando quieras.
            </label>
          </div>
          <div className='modal-submitbtn'>
            <button type='submit' className='btn btn-primary text-black'>
              {text}
            </button>
          </div>

          {cart.map((dish, index) => {
            return <input key={index} type='hidden' name={dish.name} value={`$${dish.price} * ${dish.qty} = $${dish.price * dish.qty}`} />;
          })}

          <input type='hidden' name='Cantidad total' value={`${quantity} platos`} />
          <input type='hidden' name='Total' value={`$${total}`} />
        </form>
      </>
    );
  }

  if (type === 'comentario') {
    return (
      <form className='w-100' autoComplete='off' onSubmit={handleOnSubmit}>
        <div className='form-floating'>
          <input className='form-control' type='text' value={form.comentario} autoFocus name='comentario' required onChange={onChange} />
          <label htmlFor='floatingInputValue'>Comentario</label>
        </div>
        <div className='modal-submitbtn'>
          <button type='submit' className='btn btn-primary text-black'>
            {text}
          </button>
        </div>
      </form>
    );
  }

  return (
    <>
      <form className='w-100' autoComplete='off' onSubmit={handleOnSubmit}>
        <div className='form-floating'>
          <input className='form-control' type='text' value={form.name} autoFocus name='name' required onChange={onChange} />
          <label htmlFor='floatingInputValue'>Nombre</label>
        </div>
        <div className='form-floating'>
          <textarea className='form-control' type='text' value={form.description} name='description' required onChange={onChange} style={{ minHeight: '100px' }} />
          <label htmlFor='floatingInputValue'>Descripción</label>
        </div>
        <div className='form-floating'>
          <input className='form-control' type='text' value={form.img} name='img' onChange={onChange} />
          <label htmlFor='floatingInputValue'>Imágen</label>
        </div>

        {payload.price && (
          <div className='form-floating'>
            <input className='form-control' type='number' value={form.price} name='price' required onChange={onChange} />
            <label htmlFor='floatingInputValue'>Precio</label>
          </div>
        )}

        <div className='modal-submitbtn'>
          <button type='submit' className='btn btn-primary text-black'>
            {text}
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
