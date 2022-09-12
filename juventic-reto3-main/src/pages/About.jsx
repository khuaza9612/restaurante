import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Modal from '../components/Modal';
import Form from '../components/Form';
import Team from '../components/Team';
import Map from '../components/Map';
import URL from '../server';
import { useLoginContext } from '../contexts/loginContext';

const About = () => {
  const [empleados, setEmpleados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isButtonOpen, setIsButtonOpen] = useState(false);
  const {
    client: { isAdmin }
  } = useLoginContext();

  const fetchTeam = async () => {
    const res = await fetch(`${URL}/empleado`);
    const empleado = await res.json();
    setEmpleados(empleado);
    setLoading(false);
  };

  const createPerson = person => {
    axios
      .post(`${URL}/empleado`, person)
      .then(({ data }) => setEmpleados([...empleados, data]))
      .catch(console.log);
  };

  const updatePerson = person => {
    setEmpleados(empleados.map(prev => (prev.id === person.id ? person : prev)));
    axios.patch(`${URL}/empleado/${person.id}`, person).catch(console.log);
  };

  const deletePerson = person => {
    axios
      .delete(`${URL}/empleado/${person.id}`)
      .then(({ data }) => setEmpleados(empleados.filter(d => d.id !== person.id)))
      .catch(console.log);
  };

  useEffect(() => {
    fetchTeam();
    window.scrollTo({ top: true });
  }, []);

  return (
    <>
      <section id='about'>
        <div className='container'>
          <div className='text-center'>
            <h2 className='section-heading text-uppercase mt-5'>NOSOTROS</h2>
            <h3 className='section-subheading text-muted'>Pane e pasta colombiani.</h3>
          </div>
          <ul className='timeline'>
            <li>
              <div className='timeline-image'>
                <img className='rounded-circle img-fluid' src='assets/img/imagen 1.jfif' alt='...' />
              </div>
              <div className='timeline-panel'>
                <div className='timeline-heading'>
                  <h4>2019-2021</h4>
                  <h4 className='subheading'>¿COMO NACIO NUESTRA IDEA?</h4>
                </div>
                <div className='timeline-body'>
                  <p className='text-muted'>
                    Todo nació como un sueño de cada uno de nosotros, donde las ideas y profesiones se complementaron dando esto como resultado el mejor restaurante.
                  </p>
                </div>
              </div>
            </li>
            <li className='timeline-inverted'>
              <div className='timeline-image'>
                <img className='rounded-circle img-fluid' src='assets/img/imagen 4.jfif' alt='...' />
              </div>
              <div className='timeline-panel'>
                <div className='timeline-heading'>
                  <h4>2019</h4>
                  <h4 className='subheading'>¿COMO TRABAJAMOS PARA PODER LOGRARLO?</h4>
                </div>
                <div className='timeline-body'>
                  <p className='text-muted'> Fue una combinación de parte de todos, llena de amor, dedicación y mucha disciplina. </p>
                </div>
              </div>
            </li>
            <li>
              <div className='timeline-image'>
                <img className='rounded-circle img-fluid' src='assets/img/imagen 2.jfif' alt='...' />
              </div>
              <div className='timeline-panel'>
                <div className='timeline-heading'>
                  <h4>2020</h4>
                  <h4 className='subheading'>ABRIMOS NUESTRO NEGOCIO </h4>
                </div>
                <div className='timeline-body'>
                  <p className='text-muted'>
                    Abrimos este gran sueño siendo un logro fundamental para la vida de cada uno de nosotros, cada día con nuestro servicio les queremos brindar y
                    trasmitir la misma pasión por la cocina y el amor a las pastas y así lograr que se sientan en un lugar lleno de amor y paz.
                  </p>
                </div>
              </div>
            </li>
            <li className='timeline-inverted'>
              <div className='timeline-image'>
                <img className='rounded-circle img-fluid' src='assets/img/imagen 3.jfif' alt='...' />
              </div>
              <div className='timeline-panel'>
                <div className='timeline-heading'>
                  <h4>2021</h4>
                  <h4 className='subheading'>Segunda sede</h4>
                </div>
                <div className='timeline-body'>
                  <p className='text-muted'>
                    Luego de cumplir nuestro primer sueño, se fue creando otra meta que en el 2021 fue posible, este año ha sido lleno de muchas experiencias, donde se ha
                    hecho realidad la inauguración nuestro segundo restaurante, siendo esto un motor fundamental para cada día brindarles lo mejor.
                  </p>
                </div>
              </div>
            </li>
            <li className='timeline-inverted'>
              <div className='timeline-image'>
                <h4 className='h4margintop'>
                  ¡Se tú
                  <br />
                  parte
                  <br />
                  de esta
                  <br />
                  historia!
                </h4>
              </div>
            </li>
          </ul>
        </div>
      </section>
      <section className='page-section bg-light' id='team'>
        <div className='container'>
          <div className='text-center'>
            <h2 className='section-heading text-uppercase'>NUESTRO EQUIPO</h2>
            <h3 className='section-subheading text-muted'>PANE E PASTA COLOMBIANI</h3>
          </div>
          {loading ? (
            <div className='d-flex justify-content-center'>
              <div className='spinner-border' role='status'>
                <span className='visually-hidden'>Loading...</span>
              </div>
            </div>
          ) : (
            <div className='row'>
              {empleados.map(person => {
                return <Team key={person.id} person={person} updatePerson={updatePerson} deletePerson={deletePerson}></Team>;
              })}
            </div>
          )}
        </div>
      </section>
      <Map></Map>
      {isAdmin && (
        <button className='admin-create-btn btn btn-secondary' onClick={() => setIsButtonOpen(!isButtonOpen)}>
          Agregar nuevo miembro
        </button>
      )}
      {isButtonOpen && (
        <Modal isOpen={setIsButtonOpen} title={`Crea un nuevo plato`}>
          <div className='modal-content'>
            <Form
              payload={{
                name: '',
                description: '',
                img: ''
              }}
              text={'crear'}
              action={createPerson}
              isOpen={setIsButtonOpen}
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export default About;
