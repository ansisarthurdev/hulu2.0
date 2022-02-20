import React from 'react'
import styled from 'styled-components'

//react router
import { Link } from "react-router-dom";

//icons
import { Facebook } from '@styled-icons/boxicons-logos/Facebook';
import { Twitter } from '@styled-icons/boxicons-logos/Twitter';
import { Youtube } from '@styled-icons/boxicons-logos/Youtube';
import { Instagram } from '@styled-icons/boxicons-logos/Instagram';
import { BadgeAd } from '@styled-icons/bootstrap/BadgeAd';

const Footer = () => {
  return (
    <Container>
        <Top>
            <TopItem className='browse'>
                <h3>Browse</h3>
                <div className='lists browse-lists'>
                    <ul className='list'>
                        <li><Link to='#'>Streaming Library</Link></li>
                        <li><Link to='#'>Live TV</Link></li>
                        <li><Link to='#'>Live News</Link></li>
                        <li><Link to='#'>Live Sports</Link></li>
                    </ul>
                    <ul className='list'>
                        <li><Link to='#'>TV Shows</Link></li>
                        <li><Link to='#'>Movies</Link></li>
                        <li><Link to='#'>Originals</Link></li>
                        <li><Link to='#'>Networks</Link></li>
                        <li><Link to='#'>Kids</Link></li>
                        <li><Link to='#'>FX</Link></li>
                    </ul>
                    <ul className='list'>
                        <li><Link to='#'>HBO Maxᵀᴹ</Link></li>
                        <li><Link to='#'>Cinemax</Link></li>
                        <li><Link to='#'>Showtime</Link></li>
                        <li><Link to='#'>STARZ</Link></li>
                    </ul>
                    <ul className='list'>
                        <li><Link to='#'>Hulu, Disney+, and ESPN+</Link></li>
                        <li><Link to='#'>Hulu (No Ads), Disney+, and ESPN+</Link></li>
                        <li><Link to='#'>Student Discount</Link></li>
                    </ul>
                </div>
            </TopItem>

            <TopItem className='help'>
                <h3>Help</h3>
                <div className='lists'>
                    <ul className='list'>
                        <li><Link to='#'>Account & Billing</Link></li>
                        <li><Link to='#'>Plans & Pricing</Link></li>
                        <li><Link to='#'>Supported Devices</Link></li>
                        <li><Link to='#'>Accessibility</Link></li>
                    </ul>
                </div>
            </TopItem>

            <TopItem className='about-us'>
                <h3>About Us</h3>
                <div className='lists'>
                    <ul className='list'>
                        <li><Link to='#'>Shop Hulu</Link></li>
                        <li><Link to='#'>Press</Link></li>
                        <li><Link to='#'>Jobs</Link></li>
                        <li><Link to='#'>Contact</Link></li>
                    </ul>
                </div>
            </TopItem>
        </Top>
        <Bottom>
            <SocialLinks>
                <Link to='#'><Facebook className='icon'/></Link>
                <Link to='#'><Twitter className='icon'/></Link>
                <Link to='#'><Youtube className='icon'/></Link>
                <Link to='#'><Instagram className='icon'/></Link>
            </SocialLinks>
            <AdditionalLinks>
                <p>© 2022 Hulu, LLC</p>
                <div className='links'>
                    <Link to='#' className='ad'><BadgeAd className='icon'/> About Ads</Link>
                    <Link to='#'>Terms of Use</Link>
                    <Link to='#'>Privacy Policy</Link>
                    <Link to='#'>Do Not Sell My Personal Information</Link>
                    <Link to='#'>Your California Privacy Rights</Link>
                    <Link to='#'>TV Parental Guidelines</Link>
                    <Link to='#'>Sitemap</Link>
                </div>
            </AdditionalLinks>
        </Bottom>
    </Container>
  )
}

const AdditionalLinks = styled.div`
padding-bottom: 30px;
font-size: .8rem;
display: flex;
flex-wrap: wrap;

p {
    margin-right: 30px;
    color: gray;
    padding-bottom: 20px;
}

a {
    text-decoration: none;
    color: gray;
    cursor: pointer;
    transition: .3s ease-in-out;
    margin: 0px 40px 0 0;

    :hover {
        color: #3370BB;
    }
}

.ad {
    .icon {
        width: 14px;
        color: #3370BB;
        position: relative;
        bottom: 2px;
    }
}
`

const SocialLinks = styled.div`
padding-bottom: 30px;

.icon {
    width: 24px;
    color: #5E6573;
    margin-right: 30px;
}
`

const Bottom = styled.div`
padding-top: 40px;
`

const TopItem = styled.div`
h3 {
    font-size: 1rem;
    text-transform: uppercase;
    font-weight: 600;
    margin-bottom: 20px;
}

.lists {
    display: flex;
    flex-wrap: wrap;
    margin-right: 10px;
}

ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    flex: 1;
}

li {
    margin-bottom: 10px;

    &:last-child {
        margin-bottom: 0;
    }

    a {
        text-decoration: none;
        color: gray;
        cursor: pointer;
        transition: .3s ease-in-out;
        :hover {
            color: #3370BB;
        }
    }
}

.browse-lists {
    @media only screen and (max-width: 820px) {
        display: grid;
        grid-template-columns: 30% 70%;
        grid-row-gap: 20px;
    }
}

`

const Top = styled.div`
border-bottom: 2px solid lightgray;
padding: 50px 0 40px 0;
display: grid;
grid-template-columns: 60% 20% 10%;
grid-template-rows: auto;
grid-gap: 20px;
grid-template-areas: 
"browse help about";

.browse {
    grid-area: browse;
}

.help {
    grid-area: help;
}

.about-us {
    grid-area: about;
}

@media only screen and (max-width: 1015px) {
    grid-template-columns: 30% 30% 40%;
    grid-template-areas: 
    "browse browse browse"
    "help about .";

    .help {
        margin-top: 30px;
    }

    .about-us {
        margin-top: 30px;
    }
}
`

const Container = styled.div`
padding: 0 4%;
margin: 30px 0 0 0;
background-color: #EBEDF2;
overflow-x: hidden;
`

export default Footer