import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

//movie poster
import MoviePoster from '../components/MoviePoster';
import Movie from '../components/Movie';

//api
import axios from 'axios';

//router
import { useParams, useNavigate } from 'react-router-dom';

//now playing
import NowPlaying from '../components/NowPlaying';

const Category = () => {

    const params = useParams();
    const navigate = useNavigate();

    const [movies, setMovies] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const fetchCategory = async () => {
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&region=US&with_genres=${params.id}`).then(
            res => {
                //console.log(res.data.results);
                setMovies(res.data.results);
                setLoaded(true);
            }
        )
    }

    useEffect(() => {
        setLoaded(false);
        fetchCategory();
        //eslint-disable-next-line
    }, [params])

    useEffect(() => {
        if(loaded && movies?.length === 0){
            navigate('/');
        }
    }, [loaded])

    return (
        <Container>
            <NowPlaying 
                id={params?.id}
            />
            <Heading>Discover - {params?.name}</Heading>
            <MoviePosterContainer>
                {movies.map(movie => (
                    <MoviePoster 
                        key={movie?.id}
                        id={movie?.id}
                        poster={movie?.poster_path}
                    />
                ))}
            </MoviePosterContainer>

            <Heading style={{marginTop: 5}}>Browse More</Heading>
            <MovieContainer>
                {movies.map(movie => (
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
        </Container>
    )
}

const MovieContainer = styled.div`
display: flex;
flex-wrap: wrap;
flex-direction: row-reverse;
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

export default Category