import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {GoPrimitiveDot} from 'react-icons/go'
import data from 'utils/careerpath.json'

import {useParams, useSearchParams} from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
const Container = styled.div`
  width: 80%;
  height: 500px;
  background-color: #dfe6ff;
  margin-left: auto;
  margin-right: auto;
  border-radius: 24px;
`
const Wrapper = styled.div``
const Title = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 70px;
  padding: 0px 160px;
  color: #002b9a;
`
const InnerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
`
const Heading = styled.p`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  //   line-height: 35px;
  //   width: 00px;
  color: #524fdb;
`
const About = styled.p`
  width: 80%;
`
const MainHeading = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 52.3636px;
  line-height: 72px;

  color: #000000;
`

function CareerDetails() {
  const [career, setCareer] = useState({})

  const params = useParams()
  useEffect(() => {
    const t = data.career.find(d => d.id == params.id)
    setCareer(t)
  }, [params.id])
  return (
    <>
      <Navbar />
      <Wrapper>
        <Title>{career.title}</Title>
        <Container>
          <InnerContainer>
            <Heading>About the position:</Heading>
            <About>{career.about}</About>
          </InnerContainer>
          <InnerContainer>
            <Heading>Skills Required:</Heading>
            <About>{career.skills}</About>
          </InnerContainer>

          <InnerContainer>
            <Heading>Is degree required:</Heading>
            <About>{career.degree}</About>
          </InnerContainer>

          <InnerContainer>
            <Heading>Average Salary:</Heading>
            <About>{career.avgsalary}</About>
          </InnerContainer>
          <InnerContainer>
            <Heading>Pre Requisites:</Heading>
            <About style={{alignItems: 'center'}}>
              <GoPrimitiveDot style={{color: 'black'}} /> {career.prerequesite1}
              <br /> <GoPrimitiveDot style={{color: 'black'}} /> {career.prerequesite2}
            </About>
          </InnerContainer>

          <InnerContainer>
            <Heading>Link:</Heading>
            <About>
              <a href={career.link}>{career.link}</a>
            </About>
          </InnerContainer>
        </Container>
      </Wrapper>
      <Footer />
    </>
  )
}

export default CareerDetails
