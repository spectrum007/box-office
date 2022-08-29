import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiGet } from '../misc/config';

const Shows = () => {
  const { id } = useParams();
  const [Data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [Error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(DataFromApi => {
        setTimeout(() => {
          if (isMounted) {
            setData(DataFromApi);
            setIsLoading(false);
          }
        }, 2000);
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
  console.log('The data we get from the api are :', Data);

  if (isLoading) {
    return <div> Data is being loaded</div>;
  }
  if (Error) {
    return <div> Error occured :{Error} </div>;
  }
  return <div> This page will show you details about the show </div>;
};

export default Shows;
