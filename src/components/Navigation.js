import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

//icons 
import { Home } from '@styled-icons/boxicons-regular/Home';
import { Lightning } from '@styled-icons/bootstrap/Lightning';
import { CheckmarkStarburst } from '@styled-icons/fluentui-system-regular/CheckmarkStarburst';
import { Bookmark } from '@styled-icons/bootstrap/Bookmark';
import { Search } from '@styled-icons/boxicons-regular/Search';
import { Person } from '@styled-icons/bootstrap/Person';
import { Close } from '@styled-icons/evaicons-solid/Close';


//react router
import { Link } from "react-router-dom";

//axios
import axios from "axios";

//debounce
import { useDebounce } from 'use-debounce';

//scroll animation
import ScrollAnimation from 'react-animate-on-scroll';

const Navigation = () => {

    //add shadow to navigation when scrolled
    window.onscroll = () => addShadowNav();

    const addShadowNav = () => {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        document.querySelector('#navigation').style.boxShadow = '-1px 10px 14px -2px rgba(0,0,0,0.35)';
    } else {
        document.querySelector('#navigation').style.boxShadow = '';
    }
    }

    const [genres, setGenres] = useState([]);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchValue] = useDebounce(searchText, 1000);
    const [searchResults, setSearchResults] = useState();

    const fetchCategories = () => {
        axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`).then(
            res => {
                setGenres(res.data.genres);
            }
        )
    }

    useEffect(() => {
        fetchCategories();
    }, [])

    const fetchSearch = () => {
        axios.get(`https://api.themoviedb.org/3/search/movie?query=${searchValue}&api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&region=US`).then(
            res => {
                console.log(res.data.results);
                setSearchResults(res.data.results);
            }
        )
    }

    const search = () => {
        if(searchValue.length > 0) {
            fetchSearch();
        }
    }

    useEffect(() => {
        search();
    }, [searchValue])

    return (
        <Container id='navigation'>
            <Top>
            <Left>
                <Link to='/'><Home className='icon' /></Link>
                <Lightning className='icon' />
                <CheckmarkStarburst className='icon' />
                <Bookmark className='icon' />
                <Search className='icon' onClick={() => setSearchOpen(true)}/>
                <Person className='icon' />
            </Left>
            <Right>
                <Link to='/'><img src='https://upload.wikimedia.org/wikipedia/commons/e/e4/Hulu_Logo.svg' alt='logo'/></Link>
            </Right>
            </Top>
            <Bottom>
                <div className='genre-list'>
                    {genres?.map(item => <Link key={item.id} to={`/categories/${item.name}/${item.id}`}><GenreSelection>{item.name}</GenreSelection></Link>)}
                </div>
                <div className='bottom-fade'></div>
            </Bottom>

            <SearchContainer style={{top: searchOpen ? '0' : '-300px', height: searchResults ? '300px' : '150px'}}>
                <Close className='icon' onClick={() => setSearchOpen(false)}/>
                <div style={{position: 'relative', top: '60px'}}>
                <TextInputContainer>
                    <input type='text' className='search-input' placeholder='Type to search...' value={searchText} onChange={e => setSearchText(e.target.value)}/>
                </TextInputContainer>

                {searchResults && <>
                    <ScrollAnimation animateIn="fadeIn" animateOnce={true} delay={400}>
                        <SearchResultContainer>
                            {searchResults.length === 0 ? 
                            <p style={{color: 'white', display: 'flex', justifyContent: 'center', fontVariant: 'all-petite-caps', padding: 10}}>we couldn't find anything while searching for {searchValue}...</p>
                            : 
                            <>
                            there is data
                            </>}
                        </SearchResultContainer>
                    </ScrollAnimation>
                </>}
                </div>

            </SearchContainer>
        </Container>
    )
}

const SearchResultContainer = styled.div`
position: relative;
background: #ffffff14;
width: calc(90% + 20px);
height: 160px;
margin: 0 auto;
`

const TextInputContainer = styled.div`
background-color: #1ce783d4;
width: 90%;
margin: 0 auto;
position: relative;
padding: 10px;
margin-bottom: 10px;

input {
    -webkit-appearance: none;
    border: none;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    font-size: 1.1rem;
    background: transparent;

    :focus {
        outline: none;
    }
}
`

const SearchContainer = styled.div`
width: 100%;
height: 150px;
position: absolute;
top: 0;
background-color: #0c1e2b;
box-shadow: -1px 10px 14px -2px rgba(0,0,0,0.35);
transition: .2s ease-in-out;

.icon {
    width: 28px;
    color: white;
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
}
`

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
position: sticky;
top: 0;
z-index: 1000;
`

export default Navigation