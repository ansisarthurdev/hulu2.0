import React, { useEffect } from 'react'


//router
import { useParams, useNavigate } from 'react-router-dom';

const MovieInfo = () => {
  const params = useParams();

  useEffect(() => {
    console.log(params)
    //eslint-disable-next-line
}, [params])

  return (
    <div>MovieInfo</div>
  )
}

export default MovieInfo