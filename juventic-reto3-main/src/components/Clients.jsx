import React, { useEffect, useState } from 'react';

import axios from 'axios';
import URL from '../server';

import Client from './Client';
import Form from './Form';
import Modal from './Modal';
import { useLoginContext } from '../contexts/loginContext';

const Clients = () => {
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [isButtonOpen, setIsButtonOpen] = useState(false);

  const { client } = useLoginContext();

  const fetchComments = async () => {
    const res = await fetch(`${URL}/comentario`);
    const Comments = await res.json();
    setComments(Comments);
    setLoading(false);
  };

  const createComment = comment => {
    setLoading(true);
    axios
      .post(`${URL}/comentario`, { ...comment, cliente_id: client.id })
      .then(({ data }) => {
        fetchComments();
      })
      .then(() => setLoading(false))
      .catch(console.log);
  };

  const deleteComentario = id => {
    axios.delete(`${URL}/comentario/${id}`).then(() => fetchComments());
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <>
      <div className='container'>
        <div className='text-center'>
          <h2 className='section-heading text-uppercase mt-5 mb-4'>OPINIONES/CLIENTES</h2>
          <h4 className='section-subheading text-muted mb-5'>PANE E PASTA COLOMBIANI</h4>
        </div>
        {loading ? (
          <div className='d-flex justify-content-center'>
            <div className='spinner-border' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </div>
          </div>
        ) : (
          <div className='row'>
            {comments
              .sort((a, b) => b.id - a.id)
              .slice(0, 8)
              .map(item => {
                return <Client key={item.id} client={item.cliente} comentario={item} deleteComentario={deleteComentario} />;
              })}
            <div className='d-flex justify-content-center mb-4'>
              <button className='btn btn-secondary' onClick={() => setIsButtonOpen(!isButtonOpen)}>
                Dános tu propio testimonio!
              </button>
            </div>
          </div>
        )}
      </div>

      {isButtonOpen && (
        <Modal isOpen={setIsButtonOpen} title={`Danos tu opinión`}>
          <div className='modal-content'>
            <Form
              type='comentario'
              payload={{
                comentario: ''
              }}
              text={'Comentanos'}
              action={createComment}
              isOpen={setIsButtonOpen}
            ></Form>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Clients;
