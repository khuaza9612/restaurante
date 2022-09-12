import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebookF, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

import { useLoginContext } from '../contexts/loginContext';
import Modal from './Modal';
import Form from './Form';

const Team = ({ person, updatePerson, deletePerson }) => {
  const {
    client: { isAdmin }
  } = useLoginContext();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <div className='col'>
        <div className='team-member'>
          <img className='mx-auto rounded-circle' src={person.img} alt='...' />
          <h4>{person.name.toUpperCase()}</h4>
          <p className='text-muted'>{person.description}</p>
          <button className='btn btn-dark btn mx-2 social-twitter'>
            <FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon>
          </button>
          <button className='btn btn-dark btn mx-2 social-facebook'>
            <FontAwesomeIcon icon={faFacebookF}></FontAwesomeIcon>
          </button>
          <button className='btn btn-dark btn mx-2 social-whatsapp'>
            <FontAwesomeIcon icon={faWhatsapp}></FontAwesomeIcon>
          </button>
          {isAdmin && (
            <>
              <button className='mt-2 mx-auto w-100 d-block btn btn-secondary' onClick={() => setIsEditing(!isEditing)}>
                editar
              </button>
              <button className='mt-2 mx-auto w-100 d-block btn btn-danger' onClick={() => deletePerson(person)}>
                eliminar
              </button>
            </>
          )}
        </div>
      </div>
      {isEditing && (
        <Modal isOpen={setIsEditing} title={`editando a ${person.name}`}>
          <div className='modal-content'>
            <Form payload={person} action={updatePerson} isOpen={setIsEditing}></Form>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Team;
