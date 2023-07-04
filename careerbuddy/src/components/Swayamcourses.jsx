import React, {useEffect, useState} from 'react'
import Pagination from './Pagination'
import Post from './Post'
import data from 'utils/swayam.json'
import './Swayamcourses.css'
import Footer from './Footer'
import styled from 'styled-components'
import {mobile} from 'responsive'
import Navbar from './Navbar'
const SearchContainer = styled.div`
  height: 50px;

  margin: 20px;
  width: 80%;
  display: flex;
  margin-right: auto;
  margin-bottom: -5px;
  margin-left: auto;
  // background-color:white;
`
const InputContainer = styled.input`
  border-radius: 10px;
  width: 100%;
  // background-color:white;
  padding: 10px;
  border: 1px solid gray;
`
const Heading = styled.p`
  text-align: center;
  font-weight: 600;
  font-size: 30px;
  padding: 20px;
  color: #002b9a;
  ${mobile({fontSize: '20px'})}
`

export default function Swayamcourses() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filtered, setFiltered] = useState([])
  const [pageNumber, setPageNumber] = useState(0)
  const coursesPerPage = 6
  const pagesVisited = pageNumber * coursesPerPage

  useEffect(() => {
    if (searchTerm.length === 0) {
      setFiltered(data.courses)
      return
    }
    // ok

    const d = data.courses.filter(e => {
      return (
        e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.professor.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })
    setFiltered(d)
  }, [searchTerm])
  // Loading indicator state
  const [isLoading, setIsLoading] = useState(false)

  return (
    <>
      <Navbar />
      <Heading>You can enroll into the following Swayam courses</Heading>
      <SearchContainer>
        <InputContainer
          placeholder="Search Courses by entering name or professor"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        ></InputContainer>
      </SearchContainer>

      <Pagination
        bottomNav={true}
        topNav={true}
        itemsOnPage={8}
        items={filtered}
        entryProp="post"
        children={<Post />}
      />

      <Footer />
    </>
  )
}
