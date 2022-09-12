import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLoginContext } from '../contexts/loginContext';
import URL from '../server';
const Contact = () => {
  const [form, setForm] = useState({ reservaciones: 1 });

  const { client } = useLoginContext();

  const onChange = e => {
    const { name, value } = e.target;
    if (name === 'reservaciones') {
      let id = '1';
      switch (value) {
        case 'Cena de amigos':
          id = 1;
          break;
        case 'Declaraciones':
          id = 2;
          break;
        case 'Despedida':
          id = 3;
          break;
        case 'Fiesta infantil':
          id = 4;
          break;
        case 'Cumpleaños':
          id = 5;
          break;
        case 'Fiesta de grados':
          id = 6;
          break;
        default:
          break;
      }
      setForm({
        ...form,
        [name]: id
      });
    } else {
      setForm({
        ...form,
        [name]: value
      });
    }
  };

  const handleOnSubmit = async e => {
    if (!client.id) {
      alert('DEBES INGRESAR');
      return;
    }
    axios
      .post(`${URL}/reserva`, { servicio_id: form.reservaciones, date: form.fecha, cliente_id: client.id, restaurante_id: 1 })
      .then(({ data }) => console.log(data))
      .catch(error => console.log(error));
  };

  useEffect(() => {
    window.scrollTo({ top: true });
  }, []);

  return (
    <>
      <section id='contact'>
        <div className='container mt-5'>
          <div className='text-center'>
            <h2 className='section-heading text-uppercase'>Contactanos</h2>
            <h3 className='section-subheading text-muted'>Pane e Pasta Colombiani</h3>
          </div>
          <div>
            <form id='contactForm' action='https://formspree.io/f/xbjqbgko' method='POST'>
              <input type='hidden' name='_language' value='es' />
              <input type='hidden' name='_subject' value='Pane e paste colombiani' />
              <div className='row align-items-stretch mb-5'>
                <div className='col-md-6'>
                  <div className='form-group'>
                    <input
                      className='form-control'
                      type='text'
                      name='Nombre'
                      placeholder='Nombre'
                      style={{ padding: '10px', width: '100%' }}
                      required
                      pattern='[a-z A-Z]{3,45}'
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      className='form-control'
                      type='email'
                      name='Email'
                      placeholder='Email'
                      style={{ padding: '10px', width: '100%' }}
                      required
                      minLength='10'
                      maxLength='125'
                    />
                  </div>
                  <div className='form-group'>
                    <input name='Telefono' type='tel' className='form-control' id='floatingInput' placeholder='Telefono' required pattern='[0-9]{7,10}' />
                  </div>
                  <div className='form-group'>
                    <select
                      className='form-select'
                      aria-label='Default select example'
                      name='reservaciones'
                      style={{
                        padding: '10px',
                        width: '100%',
                        marginBottom: '10px'
                      }}
                      onChange={onChange}
                      required
                    >
                      <option value='Cena de amigos'>Cena de amigos</option>
                      <option value='Declaraciones'>Declaraciones</option>
                      <option value='Despedida'>Despedida</option>
                      <option value='Fiesta infantil'>Fiesta infantil</option>
                      <option value='Cumpleaños'>Cumpleaños</option>
                      <option value='Fiesta de grados'>Fiesta de grados</option>
                    </select>
                  </div>
                  <div className='form-group'>
                    <input name='asistentes' type='text' className='form-control' id='floatingInput' required pattern='[0-9]*' placeholder='Numero de asistentes' />
                  </div>

                  <div className='form-group'>
                    <input name='fecha' onChange={onChange} type='datetime-local' className='form-control' id='floatingInput' required placeholder='Fecha y hora' />
                  </div>
                  <div className='form-group'>
                    <textarea
                      className='form-control'
                      type='text'
                      name='Observaciones'
                      placeholder='Observaciones'
                      minLength='0'
                      maxLength='250'
                      style={{ padding: '10px', width: '100%' }}
                    ></textarea>
                  </div>
                  <div className='form-check'>
                    <input className='form-check-input' type='checkbox' value='' id='flexCheckDefault' required />
                    <label className='text-light form-check-label' htmlFor='flexCheckDefault'>
                      Al hacer clic en "Enviar", aceptas nuestras Condiciones, la Política de datos y la Política de cookies.Es posible que te enviemos notificaciones por
                      SMS, que puedes desactivar cuando quieras.
                    </label>
                  </div>
                  <button type='submit' onClick={handleOnSubmit} className='btn btn-primary mb-4' style={{ padding: '10px', width: '100%' }}>
                    Enviar Correo
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
