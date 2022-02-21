import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

//icons
import { ArrowRightShort } from '@styled-icons/bootstrap/ArrowRightShort'
import { PlayFill } from '@styled-icons/bootstrap/PlayFill'

//scroll animation
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.min.css";


const MoviePoster = ({poster}) => {

    return (
        <Wrapper>
            <ScrollAnimation animateIn="fadeIn" animateOut="fadeOut">
            <img src={`https://image.tmdb.org/t/p/original/${poster}`} alt='Movie-Poster' />
            <PlayButton className='play-button'><PlayFill className='icon'/> <p>Play</p></PlayButton>
            <DetailsButton className='details-button'><ArrowRightShort className='icon'/> <p>Details</p></DetailsButton>
            <BottomFade/>
            </ScrollAnimation>
        </Wrapper>
    )
}

const PlayButton = styled.div`
position: absolute;
bottom: 70px;
left: 50%;
transform: translateX(-50%);
display: flex;
align-items: center;
background: #d3d3d352;
padding: 5px 15px 5px 10px;
cursor: pointer;
border-radius: 3px;
transition: .2s linear;
z-index: 20;
box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
transition: .4 ease-in-out;
opacity: 0;

:hover {
    background: white;
    color: black;
}

.icon {
    width: 20px;
    margin-right: 5px;
}

p {
    text-transform: uppercase;
    font-weight: 500;
    font-size: .9rem;
    position: relative;
    bottom: 1px;
}
`

const DetailsButton = styled.div`
position: absolute;
bottom: 30px;
left: 50%;
transform: translateX(-50%);
display: flex;
align-items: center;
background: #d3d3d352;
padding: 5px 15px 5px 10px;
cursor: pointer;
border-radius: 3px;
transition: .2s linear;
z-index: 20;
box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
transition: .4 ease-in-out;
opacity: 0;

:hover {
    background: white;
    color: black;
}

.icon {
    width: 20px;
    margin-right: 5px;
}

p {
    text-transform: uppercase;
    font-weight: 500;
    font-size: .9rem;
    position: relative;
    bottom: 1px;
}
`

const BottomFade = styled.div`
width: 100%;
height: 99%;
background: linear-gradient(to bottom, transparent, #000000a1);
position: absolute;
top: 0;
transition: .4s ease-in-out;
`

const Wrapper = styled.div`
width: auto;
height: 100%;
margin-right: 10px;
position: relative;
z-index: 10;
cursor: pointer;
transition: .4s ease-in-out;

:hover {
    transform: scale(1.1);
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

    img {
        filter: brightness(100%);
    }

    .play-button, .details-button {
        opacity: 1;
    }
}

&:first-child {
    margin-left: 4%;
}

img {
    height: 100%;
    width: 250px;
    object-fit: contain;
    filter: brightness(80%);
    transition: .4s ease-in-out;

    @media only screen and (max-width: 840px) {
        width: 200px;
    }

    @media only screen and (max-width: 705px) {
        width: 150px;
    }
}
`

export default MoviePoster;