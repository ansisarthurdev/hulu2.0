import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

//icons
import { StarFill } from '@styled-icons/bootstrap/StarFill'
import { PlayFill } from '@styled-icons/bootstrap/PlayFill'
import { ArrowRightShort } from '@styled-icons/bootstrap/ArrowRightShort'

const Movie = ({key, poster, title, release, vote, description}) => {

    //truncate text
    const truncate = (input) => {
        if(width < 688){
            return input?.length > 180 ? `${input?.substring(0, 180)}...` : input
        } else {
            return input?.length > 100 ? `${input?.substring(0, 100)}...` : input
        }
    };

    //window width
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize());
    }, []);

    return (
        <Wrapper>
            <img src={`https://image.tmdb.org/t/p/original/${poster}`} alt='Movie-Poster' />
                <div className='movie-description'>
                    <MovieInfo className='movie-info'>
                        <h3>{title}</h3>
                        <p>{truncate(description)}</p>
                    </MovieInfo>
                    <MovieInfoHidden className='movie-info-hidden'>
                        <p className='movie-ratings'>{release} • <StarFill className='icon'/> {vote}</p>
                        <div className='buttons'>
                            <div className='button' style={{marginRight: 5}}><ArrowRightShort className='icon'/><p>Details</p></div>
                            <div className='button'><PlayFill className='icon'/><p>Play</p></div>
                        </div>
                    </MovieInfoHidden>
                </div>
            <BottomFade/>
        </Wrapper>
    )
}

const MovieInfoHidden = styled.div` 
    padding: 0 5%;
    opacity: 0;
    transition: .4 ease-in-out;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;

    .buttons {
        display: flex;
    }

    .movie-ratings {
        color: white;
        display: flex;
        font-size: .7rem;
        margin-top: 5px;

        .icon {
            width: 14px;
            margin: 0 5px 0 7px;
        }
    }

    .button {
        display: flex;
        align-items: center;
        background: #d3d3d352;

        padding: 5px 15px 5px 10px;
        cursor: pointer;
        border-radius: 3px;
        transition: .2s linear;

        :hover {
            background: white;
            color: black;
        }

        p {
            text-transform: uppercase;
            font-weight: 500;
            font-size: .6rem;
        }

        .icon {
            width: 16px;
        }
    }
        
`

const MovieInfo = styled.div`
padding: 0 5%;

p {
    opacity: .7;
    font-size: .8rem;
    transition: .4s ease-in-out;
}

h3 {
    margin-bottom: 5px;
}
`

const BottomFade = styled.div`
width: 100%;
height: 99%;
background: linear-gradient(to bottom, transparent, #000000e0);
position: absolute;
top: 0;
transition: .4s ease-in-out;
`

const Wrapper = styled.div`

.movie-description {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    z-index: 100;
    flex-direction: column;
}

min-width: 300px;
height: 100%;
margin-right: 10px;
margin-bottom: 10px;
position: relative;
z-index: 10;
cursor: pointer;
transition: .4s ease-in-out;
flex: 1;

:hover {
    transform: scale(1.2);
    z-index: 100;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    
    .movie-info p {
        opacity: 1;
        text-shadow: 2px 4px 3px rgba(0,0,0,0.3)
    }

    .movie-info-hidden {
        opacity: 1;
    }

    @media only screen and (max-width: 1022px) {
        transform: scale(1.1);
    }

    @media only screen and (max-width: 687px) {
        transform: scale(1.05);
    }

    img {
        filter: brightness(100%);
    }
}

img {
    height: 100%;
    width: 100%;
    filter: brightness(70%);
    transition: .4s ease-in-out;
}
`

export default Movie;