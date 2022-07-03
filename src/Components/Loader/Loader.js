import React from 'react';
import ReactLoading from 'react-loading';
import './Loader.scss';

export default function Loader() {
  return (
    <div className='loading-div'>
        <ReactLoading type={'spin'} color={'black'} height={'150px'} width={'150px'} />
    </div>
  )
};
