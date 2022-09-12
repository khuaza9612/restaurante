import React from 'react';

const Map = () => {
  return (
    <>
      <section className='page-section ' id='about'>
        <div className='container'>
          <div className='text-center'>
            <h2 className='text-uppercase encuentranos mb-4'>ENCUENTRANOS</h2>
          </div>
          <div style={{ margin: '0 auto' }} className='maps'>
            <iframe
              title='map'
              className='maps'
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3538.6910040032035!2d-75.57535959714316!3d6.212587138763856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e4429d308d5aa6d%3A0xc35562a03191359c!2sCentro%20Comercial%20Monterrey!5e1!3m2!1ses-419!2sco!4v1631504328117!5m2!1ses-419!2sco'
              width='600'
              height='450'
              frameBorder='0'
              style={{ border: '0', margin: '0 auto' }}
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
};

export default Map;
