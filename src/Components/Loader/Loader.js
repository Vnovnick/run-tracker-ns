import React from 'react';
import ReactLoading from 'react-loading';
import './Loader.scss';

export default function Loader() {
  return (
    <div className='loading-div'>
        <ReactLoading type={'bars'} color={'black'} height={'110px'} width={'110px'} />
    </div>
  )
};
