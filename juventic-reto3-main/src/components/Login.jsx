import axios from 'axios';
import React, { useState } from 'react';

import { useLoginContext } from '../contexts/loginContext';
import URL from '../server';

const Login = ({ isOpen }) => {
  const { setClient } = useLoginContext();

  const [form, setForm] = useState({
    name: '',
    password: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const { name, password } = form;
    axios.post(`${URL}/auth/login`, { username: name, password }).then(({ data }) => {
      setClient(data);
      localStorage.setItem('token', data.token);
      isOpen(false);
    });
  };

  return (
    <>
      <form className='w-100' autoComplete='off' onSubmit={handleSubmit}>
        <div className='form-floating'>
          <input className='form-control' type='text' value={form.name} name='name' autoFocus required onChange={handleChange} />
          <label htmlFor='floatingInputValue'>Nombre de Usuario</label>
        </div>
        <div className='form-floating'>
          <input className='form-control' type='password' value={form.password} name='password' required onChange={handleChange} />
          <label htmlFor='floatingInputValue'>Contraseña</label>
        </div>

        <div className='modal-submitbtn'>
          <button type='submit' className='btn btn-primary text-black'>
            Ingresar
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
