import React from 'react'
import styled from 'styled-components';

const Company = ({name}) => {
  return (
    <Container>
        <p>{name}</p>
    </Container>
  )
}

const Container = styled.div`
margin: 10px 10px 0 0;
background-color: lightgray;
padding: 5px 7px;
border-radius: 10px;
cursor: pointer;
transition: .4s ease-in-out;

:hover {
    opacity: .7;
}
`

export default Company