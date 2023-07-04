import React, {useEffect, useState} from 'react'
import Pagination from './Pagination'
import Post from './Post'
import data from 'utils/swayam.json'
import './Swayamcourses.css'
import Footer from './Footer'
import Navbar from './Navbar'

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
      <div className="main_container">
        {isLoading && filtered.length === 0 ? (
          <div>Loading...</div>
        ) : (
          <Pagination
            bottomNav={true}
            topNav={true}
            itemsOnPage={4}
            items={filtered}
            entryProp="post"
            children={<Post />}
          />
        )}
      </div>
      <Footer />
    </>
  )
}
