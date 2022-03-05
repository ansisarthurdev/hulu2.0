import React from 'react'
import styled from 'styled-components';

//icons
import { StarFill } from '@styled-icons/bootstrap/StarFill'

//router
import { Link } from "react-router-dom";

const SearchItem = ({id, title, poster, voteAverage }) => {

    //truncate text
    const truncate = (input) => {
        let size = 25;
        return input?.length > size ? `${input?.substring(0, size)}...` : input
    };

  return (
    <Container>
        <Link to={`/movie/${id}`}>
        <div className='left'>
            {poster !== null && <img src={`https://image.tmdb.org/t/p/original/${poster}`}/>}
        </div>
        <div className='right'>
            <h5>{truncate(title)}</h5>
            <p><StarFill className='search-icon' /> {voteAverage}</p>
        </div>
        </Link>
    </Container>
  )
}

const Container = styled.div`
flex: 1;

a {
    display: flex;
    width: auto;
    margin: 0 0 10px 0;
    cursor: pointer;
    background: transparent;
    transition: .2s ease-in-out;
    padding: 5px;
    text-decoration: none;

    :hover {
        background: #0000003d;
    }

    .right {
        margin: 0 10px;
        padding-top: 5px;
    }
}


.search-icon {
    width: 14px;
    margin-right: 3px;
}

h5 {

}

p {
    display: flex;
    align-items: center;
    font-size: .8rem;
}

h5, p {
    margin: 0;
    padding: 0;
    color: white;
}

img {
    width: 60px;
}
`

export default SearchItem