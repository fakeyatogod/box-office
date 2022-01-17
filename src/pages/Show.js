import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiGet } from '../misc/config';

const Show = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  useEffect(() => {
    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`).then(res => {
      setShow(res);
    });
  }, [id]);
  // eslint-disable-next-line no-console
  console.log(show);
  return (
    <div>
      <div>This is the Show</div>
      <p>{show ? show.name : ''}</p>
    </div>
  );
};

export default Show;
