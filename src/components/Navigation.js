import React from 'react';
import styled from 'styled-components';

//icons 
import { Home } from '@styled-icons/boxicons-regular/Home';
import { Lightning } from '@styled-icons/bootstrap/Lightning';
import { CheckmarkStarburst } from '@styled-icons/fluentui-system-regular/CheckmarkStarburst';
import { Bookmark } from '@styled-icons/bootstrap/Bookmark';
import { Search } from '@styled-icons/boxicons-regular/Search';
import { Person } from '@styled-icons/bootstrap/Person';

//react router
import { Link } from "react-router-dom";

const Navigation = () => {

    const genres = [
        'Trending',
        'Top Rated',
        'Action',
        'Comedy',
        'Horror',
        'Romance',
        'Mystery',
        'SciFi',
        'Western',
        'Animation',
        'TV Movies'
    ]

    return (
        <Container>
            <Top>
            <Left>
                <Link to='/'><Home className='icon' /></Link>
                <Lightning className='icon' />
                <CheckmarkStarburst className='icon' />
                <Bookmark className='icon' />
                <Search className='icon' />
                <Person className='icon' />
            </Left>
            <Right>
                <Link to='/'><img src='https://upload.wikimedia.org/wikipedia/commons/e/e4/Hulu_Logo.svg' alt='logo'/></Link>
            </Right>
            </Top>
            <Bottom>
                <div className='genre-list'>
                    {genres.map(item => <Link key={item} to={`/categories/${item}`}><GenreSelection>{item}</GenreSelection></Link>)}
                </div>
                <div className='bottom-fade'></div>
            </Bottom>
        </Container>
    )
}

const GenreSelection = styled.div`
margin-right: 50px;
cursor: pointer;
white-space: no-wrap;
text-align: center;
display: flex;
align-self: center;
transition: .2s linear;
opacity: 1;

:hover {
    transform: scale(1.1);
    opacity: .7;
}
`

const Bottom = styled.div`
position: relative;

.genre-list {
padding: 0 4%;
color: white;
display: flex;
overflow: scroll;
margin-bottom: 20px;
align-items: center;

a {
    color: white;
    text-decoration: none;
}

::-webkit-scrollbar {
    display: none;
}
}

.bottom-fade { 
    position: absolute;
    height: 100%;
    width: 25%;
    background: white;
    top: 0;
    right: 0;
    background: linear-gradient(to right, transparent, #0C1E2B);
    pointer-events: none;
}
`

const Top = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
padding: 30px 4%;

@media only screen and (max-width: 540px) {
    flex-direction: column;
}

`

const Right = styled.div`
@media only screen and (max-width: 540px) {
    margin-top: 30px;
}

img {
    width: 100px;
    pointer-events: none;
}
`
const Left = styled.div`

@media only screen and (max-width: 540px) {
    display: flex;
    align-self: center;
}

.icon {
    width: 25px;
    height: 25px;
    color: white;
    margin-right: 40px;
    cursor: pointer;
    transition: .2s linear;
    opacity: 1;

    &:nth-child(6) {
        margin-right: 0;
    }

    @media only screen and (max-width: 540px) {
    margin-right: 20px;
    }

    :hover {
        opacity: .7;
        transform: scale(1.1);
    }
}
`

const Container = styled.div`
background-color: #0C1E2B;
position: relative;
`

export default Navigation