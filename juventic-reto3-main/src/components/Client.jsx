import React from 'react';
import { useLoginContext } from '../contexts/loginContext';

const Client = ({ client, comentario, deleteComentario }) => {
  const {
    client: { isAdmin }
  } = useLoginContext();

  return (
    <>
      <div className='col'>
        <div className='team-member'>
          <img className='mx-auto rounded-circle' src={client?.img} alt={client?.name} />
          <h4>{client?.name.toUpperCase()}</h4>
          <p className='text-muted'>{comentario.comentario}</p>
          {isAdmin && (
            <button className='btn btn-danger w-100' onClick={() => deleteComentario(comentario.id)}>
              eliminar
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Client;
