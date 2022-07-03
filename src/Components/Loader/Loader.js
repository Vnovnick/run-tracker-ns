import React from 'react';
import ReactLoading from 'react-loading';

export default function Loader() {
  return (
    <div className='loading-div'>
        <ReactLoading type={'spin'} color={'black'} height={'100px'} width={'100px'} />
    </div>
  )
};
