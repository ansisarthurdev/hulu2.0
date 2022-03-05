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

//loading
import ReactLoading from 'react-loading';

//scroll animation
import ScrollAnimation from 'react-animate-on-scroll';

const Category = () => {

    const params = useParams();
    const navigate = useNavigate();

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    const fetchCategory = async () => {
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}&region=US&with_genres=${params.id}`).then(
            res => {
                //console.log(res.data.results);
                setMovies(res.data.results);
                setLoading(false);
                setPage(page => page + 1);
            }
        )
    }

    useEffect(() => {
        window.scrollTo(0,0);
        fetchCategory();
        //eslint-disable-next-line
    }, [params])

    useEffect(() => {
        if(!loading && movies?.length === 0){
            navigate('/');
        }

        //eslint-disable-next-line
    }, [loading])

    const fetchMoreData = async () => {
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}&region=US`).then(
            res => {
                //console.log(res.data.results);
                setMovies(movies => [...movies, ...res.data.results])
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
            :<>
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
flex-direction: row-reverse;
position: relative;
padding: 20px 0;
margin: 0 3.5% 0 4%;

@media only screen and (max-width: 670px) {
    margin: 0 2% 0 4%;
}

@media only screen and (max-width: 687px) {
    flex-direction: column-reverse;
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