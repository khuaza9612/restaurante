import React, { useState, useEffect } from 'react';

import Service from '../components/Service';
import Modal from '../components/Modal';
import Form from '../components/Form';
import URL from '../server';
import { useLoginContext } from '../contexts/loginContext';
import axios from 'axios';

const Services = () => {
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [isButtonOpen, setIsButtonOpen] = useState(false);
  const {
    client: { isAdmin }
  } = useLoginContext();

  const fetchServices = async () => {
    const res = await fetch(`${URL}/servicio`);
    const services = await res.json();
    setServices(services);
    setLoading(false);
  };

  const createService = service => {
    axios
      .post(`${URL}/servicio`, service)
      .then(({ data }) => setServices([...services, data]))
      .catch(console.log);
  };

  const updateService = service => {
    setServices(services.map(prev => (prev.id === service.id ? service : prev)));
    axios.patch(`${URL}/servicio/${service.id}`, service).catch(console.log);
  };

  const deletePerson = person => {
    axios
      .delete(`${URL}/servicio/${person.id}`)
      .then(({ data }) => setServices(services.filter(d => d.id !== person.id)))
      .catch(console.log);
  };

  useEffect(() => {
    window.scrollTo({ top: true });
    fetchServices();
  }, []);

  return (
    <>
      <section className='bg-light' id='portfolio'>
        <div className='container'>
          <div className='text-center'>
            <h2 className='section-heading text-uppercase mt-5'>Servicios</h2>
            <h3 className='section-subheading text-muted'>¡Todo para tus celebraciones! </h3>
          </div>
          {loading ? (
            <div className='d-flex justify-content-center'>
              <div className='spinner-border' role='status'>
                <span className='visually-hidden'>Loading...</span>
              </div>
            </div>
          ) : (
            <div className='row'>
              {services.map(service => (
                <Service key={service.id} service={service} updateService={updateService} deletePerson={deletePerson}></Service>
              ))}
            </div>
          )}
        </div>
      </section>
      {isAdmin && (
        <button className='admin-create-btn btn btn-secondary' onClick={() => setIsButtonOpen(!isButtonOpen)}>
          Agregar nuevo servicio
        </button>
      )}
      {isButtonOpen && (
        <Modal isOpen={setIsButtonOpen} title={`Crea un nuevo servicio`}>
          <div className='modal-content'>
            <Form
              payload={{
                name: '',
                description: '',
                img: ''
              }}
              text={'crear'}
              action={createService}
              isOpen={setIsButtonOpen}
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export default Services;
