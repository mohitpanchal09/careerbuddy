import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import data from 'utils/swayam.json'
import Footer from './Footer'
import Navbar from './Navbar'
import ReactPaginate from 'react-paginate'
import './Pagination.css'
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
  margin-bottom: 20px;
  font-size: 18px;

  .paginationButton {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    padding: 10px 15px;
    border-radius: 10px;
    border: 1px solid #ddd;
    background-color: #fff;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover:not(.disabled) {
      background-color: #f7f7f7;
      border-color: #aaa;
    }

    &.active {
      background-color: #002b9a;

      color: #fff;
    }

    &.disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  justify-content: center;
`
const Container = styled.div`
  height: 180px;
  width: 300px;
  margin: 20px;
  display: flex;
  padding: 12px;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
  background-color: rgba(126, 138, 245, 0.16);
`
const Title = styled.p`
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  padding: 10px;
  //   line-height: 33px;
  /* identical to box height */

  color: #002b9a;
`
const Professor = styled.p`
  font-size: 15px;
  color: black;
`
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
`

function Swayamcourses() {
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
    const d = data.courses.filter(e => {
      return (
        e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.professor.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })
    setFiltered(d)
  }, [searchTerm])
  const pageCount = Math.ceil(filtered.length / coursesPerPage)
  const changePage = ({selected}) => {
    setPageNumber(selected)
  }
  return (
    <>
      <Navbar />
      <Wrapper>
        <Heading>You can enroll into the following Swayam courses</Heading>
        <SearchContainer>
          <InputContainer
            placeholder="Search Courses by entering name or professor"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          ></InputContainer>
        </SearchContainer>

        {filtered.slice(pagesVisited, pagesVisited + coursesPerPage).map(c => (
          <Container key={c.id}>
            <Title>{c.title}</Title>
            <Professor>{c.professor}</Professor>
            <a href={`https://nptel.ac.in/courses/${c.id}`} target="_blank" rel="noreferrer">
              view course
            </a>
          </Container>
        ))}
      </Wrapper>
      <PaginationContainer>
        <ReactPaginate
          previousLabel={'Prev'}
          nextLabel={'Next'}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={'pagination'}
          previousClassName={'previous'}
          nextClassName={'next'}
          disabledClassName={'disabled'}
          activeClassName={'active'}
          pageClassName={'page'}
          pageLinkClassName={'page-link'}
        />
      </PaginationContainer>
      <Footer />
    </>
  )
}

export default Swayamcourses
