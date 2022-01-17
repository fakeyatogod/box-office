import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiGet } from '../misc/config';

const Show = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(res => {
        if (isMounted) {
          setShow(res);
          setIsLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err.message);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);
  // eslint-disable-next-line no-console
  console.log(show);

  if (isLoading) {
    return <div>Loading content</div>;
  }

  if (error) {
    return <div>Error Occured: {error}</div>;
  }
  return (
    <div>
      <div>This is the Show</div>
      <p>{show ? show.name : ''}</p>
    </div>
  );
};

export default Show;
