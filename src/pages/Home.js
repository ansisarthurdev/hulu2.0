import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

//now playing
import NowPlaying from '../components/NowPlaying';

//movie poster
import MoviePoster from '../components/MoviePoster';
import Movie from '../components/Movie';

//loading
import ReactLoading from 'react-loading';

import axios from 'axios';

//scroll animation
import ScrollAnimation from 'react-animate-on-scroll';

const Home = () => {

    const [nowPlaying, setNowPlaying] = useState([]);
    const [popular, setPopular] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    const fetchData = async () => {
        axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&region=US`).then(
            res => {
                //console.log(res.data.results);
                setNowPlaying(res.data.results);
            }
        )

        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}&region=US`).then(
            res => {
                //console.log(res.data.results);
                setPopular(res.data.results);
                setLoading(false);
                setPage(page => page + 1);
            }
        )
    }

    useEffect(() => {
        window.scrollTo(0,0);
        fetchData();
        //eslint-disable-next-line
    }, [])

    const fetchMoreData = async () => {
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}&region=US`).then(
            res => {
                //console.log(res.data.results);
                setPopular(popular => [...popular, ...res.data.results])
                setPage(page => page + 1);
            }
        )
    }

    return (
        <Container>
            {loading ? 
            <div style={{display: 'flex', justifyContent: 'center'}}>
            <ReactLoading type={"bubbles"} color={'#1ce783'}/>
            </div>
            : <>
            <NowPlaying />
            <Heading>Now Playing</Heading>
            <MoviePosterContainer>
                {nowPlaying.map(movie => (
                    <MoviePoster 
                        key={movie?.id}
                        id={movie?.id}
                        poster={movie?.poster_path}
                    />
                ))}
            </MoviePosterContainer>

            <Heading style={{marginTop: 5}}>Browse More</Heading>
            <MovieContainer>
                {popular.map(movie => (
                    <Movie
                        key={movie?.id}
                        id={movie?.id}
                        poster={movie?.backdrop_path}
                        title={movie?.original_title}
                        release={movie?.release_date}
                        vote={movie?.vote_average}
                        description={movie?.overview}
                    />
                ))} 
            </MovieContainer>

            <ScrollAnimation animateIn="fadeIn"><Button onClick={() => fetchMoreData()}><p>Load more...</p></Button></ScrollAnimation>
            </>}          
        </Container>
    )
}

const Button = styled.button`
    -webkit-appearance: none;
    border: none;
    background: #1ce783;
    display: flex;
    margin: 0 auto;
    padding: 5px 10px;
    border-radius: 10px;
    cursor: pointer;
    transition: .2s ease-in-out;
    opacity: .7;
    font-variant: all-petite-caps;
    font-weight: bold;
    font-size: .8rem;

    :hover {
        opacity: 1;
        transform: scale(1.1);
    }
`

const MovieContainer = styled.div`
display: flex;
flex-wrap: wrap;
position: relative;
padding: 20px 0;
margin: 0 3.5% 0 4%;

@media only screen and (max-width: 670px) {
    margin: 0 2% 0 4%;
}

::-webkit-scrollbar {
    display: none;
}
`

const MoviePosterContainer = styled.div`
display: flex;
flex-direction: row;
overflow-x: scroll;
position: relative;
padding: 20px 0;

::-webkit-scrollbar {
    display: none;
}
`

const Heading = styled.h3`
margin: 30px 4% 15px;
font-size: 1.6rem;
`

const Container = styled.div`
color: white;

`

export default Home