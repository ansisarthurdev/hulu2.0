import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import axios from 'axios';

//icons
import { StarFill } from '@styled-icons/bootstrap/StarFill'
import { PlayFill } from '@styled-icons/bootstrap/PlayFill'
import { ArrowRightShort } from '@styled-icons/bootstrap/ArrowRightShort'

const NowPlaying = () => {

    const [randomNumber, setRandomNumber] = useState('');
    const [result, setResult] = useState('');

    const getRandomNumber = () => {
        //top 5 trending list
        const number = Math.floor(Math.random() * 6);
        setRandomNumber(number);
    }

    const fetchNowPlaying = async () => {
        axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&region=US`).then(
            res => {
                getRandomNumber();
                //console.log(res.data.results);
                setResult(res.data.results[randomNumber]);
                console.log(result);
            }
        )
    }

    useEffect(() => {
        fetchNowPlaying();
        //eslint-disable-next-line
    }, [randomNumber])

    //truncate text
    const truncate = (input) => input?.length > 150 ? `${input?.substring(0, 150)}...` : input;

    return (
        <Wrapper>
            <img className='banner' src={`https://image.tmdb.org/t/p/original/${result?.backdrop_path}`} alt='banner'/> 
            <ImageFade />
            <BannerContent>
                <p className='header'>Start Watching</p>
                <h3 className='movie-name'>{result?.original_title}</h3>
                <p className='movie-description'>
                {truncate(result?.overview)}
                </p>
                <p className='movie-ratings'>{result?.release_date} • <StarFill className='icon'/> {result?.vote_average}</p>
                <Buttons>
                    <div className='button play'><PlayFill className='icon'/><p>Play</p></div>
                    <div className='button details'><ArrowRightShort className='icon'/><p>Details</p></div>
                </Buttons>
                </BannerContent>
        </Wrapper>
    )
}

const Buttons = styled.div`
display: flex;
align-items: center;
color: white;
@media only screen and (max-width: 540px) {
    justify-content: center;
}

.button {
display: flex;
align-items: center;
background: #d3d3d352;
margin: 7% 10px 0 0;
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
}

.icon {
    width: 30px;
}
}
`

const ImageFade = styled.div`
width: 100%;
height: 100%;
background: linear-gradient(to right,#0c1e2b8a,black);
position: absolute;
top: 0;
`

const BannerContent = styled.div`
position: absolute;
top: 15%;
left: 4%;
padding-right: 20px;

@media only screen and (max-width: 600px) {
    text-align: center;
}


.movie-ratings {
color: white;
display: flex;
align-self: center;
font-size: .9rem;
margin-top: 5%;
@media only screen and (max-width: 540px) {
    justify-content: center;
}


.icon {
    width: 18px;
    margin: 0 5px 0 7px;
}
}

.movie-description {
font-size: 1rem;
color: white;
opacity: .7;
margin-top: 2%;
max-width: 500px;
}

.movie-name {
font-size: 3rem;
color: white;
}

.header {
    color: white;
    opacity: .7;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 2px;
    margin-bottom: 2%;
}
`

const Wrapper = styled.div`
position: relative;
height: 600px;

.banner {
    width: 100%;
    height: 100%;
    pointer-events: none;
    object-fit: cover;
}

`

export default NowPlaying
