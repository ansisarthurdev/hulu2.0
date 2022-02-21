import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

//movie poster
import MoviePoster from '../components/MoviePoster';
import Movie from '../components/Movie';

import axios from 'axios';

const Home = () => {

    const [movies, setMovies] = useState([]);

    const fetchNowPlaying = async () => {
        axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&region=US`).then(
            res => {
                console.log(res.data.results);
                setMovies(res.data.results);
            }
        )
    }

    useEffect(() => {
        fetchNowPlaying();
        //eslint-disable-next-line
    }, [])

    return (
        <Container>
            <Heading>Now Playing</Heading>
            <MoviePosterContainer>
                {movies.map(movie => (
                    <MoviePoster 
                        poster={movie?.poster_path}
                    />
                ))}
            </MoviePosterContainer>

            <Heading style={{marginTop: 5}}>Browse More</Heading>
            <MovieContainer>
                {movies.map(movie => (
                    <Movie
                        key={movie?.id}
                        poster={movie?.backdrop_path}
                        title={movie?.original_title}
                        release={movie?.release_date}
                        vote={movie?.vote_average}
                        description={movie?.overview}
                    />
                ))} 
            </MovieContainer>            
        </Container>
    )
}

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