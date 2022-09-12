import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCircle } from '@fortawesome/free-solid-svg-icons';

import { useLoginContext } from '../contexts/loginContext';
import Modal from './Modal';
import Form from './Form';

const Service = ({ service, updateService, deletePerson }) => {
  const {
    client: { isAdmin }
  } = useLoginContext();

  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <div className='col-lg-4 col-sm-6'>
        <div className='portfolio-item'>
          <a className='portfolio-link' data-bs-toggle='modal' href={`#portafolioModal${service.id}`}>
            <div className='portfolio-hover'>
              <div className='portfolio-hover-content'>
                <FontAwesomeIcon icon={faPlus} size='3x'></FontAwesomeIcon>
              </div>
            </div>
            <img className='img-fluid h-50' src={service.img} alt='...' />
          </a>
          <div className='portfolio-caption'>
            <div className='portfolio-caption-heading'>{service.name.toUpperCase()}</div>
            {isAdmin && (
              <>
                <button className='mt-2 mx-auto w-100 d-block btn btn-secondary' onClick={() => setIsEditing(!isEditing)}>
                  editar
                </button>
                <button className='mt-2 mx-auto w-100 d-block btn btn-danger' onClick={() => deletePerson(service)}>
                  eliminar
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className='portfolio-modal modal fade' id={`portafolioModal${service.id}`} tabIndex='-1' role='dialog' aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='close-modal' data-bs-dismiss='modal'>
              <FontAwesomeIcon icon={faCircle} size='2x'></FontAwesomeIcon>
            </div>
            <div className='container'>
              <div className='row justify-content-center'>
                <div className='col-lg-8'>
                  <div className='modal-body'>
                    <h2>{service.name.toUpperCase()}</h2>
                    <img className='img-fluid h-50' src={service.img} alt='...' />

                    <p>{service.description}</p>

                    <button className='btn btn-primary btn-xl text-uppercase' data-bs-dismiss='modal' type='button'>
                      <i className='fas fa-times me-1'></i>
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <Modal isOpen={setIsEditing} title={`editando ${service.name}`}>
          <div className='modal-content'>
            <Form payload={service} action={updateService} isOpen={setIsEditing}></Form>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Service;
