import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import axios from 'axios';

//icons
import { StarFill } from '@styled-icons/bootstrap/StarFill'
import { PlayFill } from '@styled-icons/bootstrap/PlayFill'
import { ArrowRightShort } from '@styled-icons/bootstrap/ArrowRightShort'

//scroll animation
import ScrollAnimation from 'react-animate-on-scroll';

//router
import { Link } from 'react-router-dom';

const NowPlaying = ({ id }) => {

    const [randomNumber, setRandomNumber] = useState('');
    const [result, setResult] = useState('');


    const getRandomNumber = () => {
        //top 5 trending list
        const number = Math.floor(Math.random() * 11);
        setRandomNumber(number);
    }

    const fetchNowPlaying = async () => {
        if(id){
            axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&region=US&with_genres=${id}`).then(
                res => {
                    //console.log(res.data.results);
                    setResult(res.data.results[randomNumber]);
                }
            )
        } else {
            axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&region=US`).then(
                res => {
                    //console.log(res.data.results);
                    setResult(res.data.results[randomNumber]);
                }
            )
        }
    }

    useEffect(() => {
        getRandomNumber();
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        fetchNowPlaying();
        //eslint-disable-next-line
    }, [randomNumber])

    //truncate text
    const truncate = (input) => input?.length > 150 ? `${input?.substring(0, 150)}...` : input;

    useEffect(() => {
        getRandomNumber();
    }, [id])

    return (
        <Wrapper>
            <img className='banner' src={`https://image.tmdb.org/t/p/original/${result?.backdrop_path}`}/> 
            <ImageFadeLeft />
            <ImageFadeBottom />
            {result && <> 
            <BannerContent>
                <ScrollAnimation animateIn="fadeIn" animateOnce={true}><p className='header'>Start Watching</p></ScrollAnimation>
                <ScrollAnimation animateIn="fadeIn" animateOnce={true} delay={400}><h3 className='movie-name'>{result?.original_title}</h3></ScrollAnimation>
                <ScrollAnimation animateIn="fadeIn" animateOnce={true} delay={800}><p className='movie-description'>
                {truncate(result?.overview)}
                </p></ScrollAnimation>
                <ScrollAnimation animateIn="fadeIn" animateOnce={true} delay={1200}><p className='movie-ratings'>{result?.release_date} • <StarFill className='icon'/> {result?.vote_average}</p></ScrollAnimation>
                <ScrollAnimation animateIn="fadeIn" animateOnce={true} delay={1600}>
                <Buttons>
                    <div className='button play'><PlayFill className='icon'/><p>Play</p></div>
                    
                    <div className='button details'>
                        <Link to={`/movie/${result?.id}`}>
                        <ArrowRightShort className='icon'/><p>Details</p>
                        </Link>
                    </div>
             
                </Buttons></ScrollAnimation>
            </BannerContent>
            </>}

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

a {
    display: flex;
    align-items: center;
    color: white;
    text-decoration: none;
}

:hover {
    background: white;
    color: black;

    a {
        color: black;
    }
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

const ImageFadeBottom = styled.div`
width: 100%;
height: 100%;
background: linear-gradient(to bottom, transparent, #000000a1);
position: absolute;
top: 0;
`

const ImageFadeLeft = styled.div`
width: 100%;
height: 100%;
background: linear-gradient(to left, #0c1e2b36, black);
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
