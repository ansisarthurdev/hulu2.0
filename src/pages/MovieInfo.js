import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import axios from 'axios';

//router
import { useParams, useNavigate } from 'react-router-dom';

//scroll animation
import ScrollAnimation from 'react-animate-on-scroll';

//icons
import { StarFill } from '@styled-icons/bootstrap/StarFill'
import { TextDescription } from '@styled-icons/fluentui-system-regular/TextDescription'
import { Users } from '@styled-icons/fa-solid/Users'
import { Link } from '@styled-icons/boxicons-regular/Link'
import { Web } from '@styled-icons/foundation/Web'



//components
import Company from '../components/Company';

const MovieInfo = () => {
  const params = useParams();

  const [movie, setMovie] = useState('');

  const fetchData = () => {
    axios.get(`https://api.themoviedb.org/3/movie/${params?.id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`).then(
      res => {
        console.log(res.data);
        setMovie(res.data);
      }
    )
  }

  useEffect(() => {
    fetchData();
    //eslint-disable-next-line
}, [params])

  return (
    <Container>

    <Banner>
      <BannerImg src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} />
      <ImageFadeLeft />
      <ImageFadeBottom />
      {
        movie && <>
        <BannerText>
          <ScrollAnimation animateIn="fadeIn" animateOnce={true}><h3 className='header'>{movie?.original_title}</h3></ScrollAnimation>
          <ScrollAnimation animateIn="fadeIn" animateOnce={true} delay={400}><p className='tagline'>{movie?.tagline}</p></ScrollAnimation>
          <ScrollAnimation animateIn="fadeIn" animateOnce={true} delay={600}><p className='movie-ratings'>{movie?.release_date} • <StarFill className='icon'/> {movie?.vote_average}</p></ScrollAnimation>
        </BannerText>
        </>
      }

    </Banner>

    <MovieDescription>
      <Heading>About</Heading>
      <Description>
        <ScrollAnimation className='left' animateIn="fadeIn" animateOnce={true} delay={800}>
          <h5><Web className='icon'/><p>Genres & Homepage</p></h5>
          <Genres>
          {movie && movie?.genres.map(genre => (
            <Company 
              key={genre?.id}
              name={genre?.name}
            />
          ))}
          </Genres>
          
          <a href={movie?.homepage}>
            <div className='web'>
              <Link className='icon'/>
              <p>Visit Homepage</p>
            </div>
          </a>
        </ScrollAnimation>


        <Right>
          <ScrollAnimation animateIn="fadeIn" animateOnce={true} delay={800}>
          <RightElement>
            <h5><TextDescription className='icon'/>Movie Description</h5>
            {movie?.overview}
          </RightElement>
          </ScrollAnimation>

          <ScrollAnimation animateIn="fadeIn" animateOnce={true} delay={1000}>
          <RightElement>
            <h5><Users className='icon'/>Production Companies</h5>
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
            {movie && movie?.production_companies.map(company => (
              <Company 
                key={company?.id}
                name={company?.name}
              />
            ))}
            </div>
          </RightElement>
          </ScrollAnimation>
          
        </Right>
      </Description>
    </MovieDescription>

    </Container>
  )
}

const Genres = styled.div`
display: flex;
margin-bottom: 20px;
flex-wrap: wrap;
justify-content: center;
`

const RightElement = styled.div`
border-radius: 20px;
background: #EBEDF2;
padding: 20px;

h5 {
  margin: 0 0 10px 0;
  padding: 0;
  display: flex;
  align-items: center;

  .icon {
    width: 24px;
    margin-right: 10px;
  }
}
`

const Right = styled.div`
width: 60%;

@media only screen and (max-width: 600px) {
  width: 100%;
}

.animated {
  margin-top: 20px;

  &:nth-child(1){
    margin-top: 0;
  }
}
`

const Description = styled.div`
width: 100%;
border-top: 1px solid #ebedf23b;
display: flex;
padding-top: 25px;
overflow: hidden;

@media only screen and (max-width: 600px) {
  flex-direction: column-reverse;
}

.left {
  width: 35%;
  margin-right: 5%;
  background: #EBEDF2;
  border-radius: 20px;
  padding: 20px;

  @media only screen and (max-width: 600px) {
    width: 92%;
    margin: 20px 0 0 0; 
  }

  h5 {
    padding: 0;
    margin: 0 0 10px 0;
    display: flex;
    align-items: center;

    .icon {
      width: 24px;
      margin-right: 10px;
    }
  }
  

  a {
    color: black;
    text-decoration: none;
    display: flex;
    justify-content: center;

    .web {
      display: flex;
      align-items: center;
      background: lightgray;
      padding: 5px 10px;
      border-radius: 10px;
      cursor: pointer;
      transition: .4s ease-in-out;

      :hover {
        opacity: .7;
      }
    }
  }

  .icon {
    width: 24px;
    margin-right: 5px;
  }
}
`

const Heading = styled.h3`
margin: 30px 0 15px;
font-size: 1.6rem;
color: white;
`

const MovieDescription = styled.div`
padding: 0 4%;
`

const BannerText = styled.div`
color: white;
width: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
position: absolute;
top: 50%;
transform: translateY(-50%);
text-align: center;

@media only screen and (max-width: 400px) {
  width: 80%;
  margin-left: 10%;
}

.header {
  font-size: 3rem;
  color: white;
}

.tagline {
  font-size: 1rem;
  font-style: italic;
  opacity: .8;
}

.movie-ratings {
  display: flex;
  margin-top: 50px;

  .icon {
    width: 24px;
    margin: 0 5px;
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

const Banner = styled.div`
height: 400px;
position: relative;
`

const BannerImg = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
`

const Container = styled.div``

export default MovieInfo