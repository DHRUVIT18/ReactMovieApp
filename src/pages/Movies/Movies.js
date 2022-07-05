import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CustomPagination from '../../components/CustomPagination/CustomPagination';
import Genres from '../../components/Genres';
import SingleContent from '../../components/SingleContent/SingleContent';
import useGenres from '../../Hooks/useGenres';

const Movies = () => {


  const [page, setpage] = useState(1)
  const [content, setcontent] = useState([])
  const [numOfPages, setnumOfPages] = useState()
  const [selectedGenres, setselectedGenres] = useState([])
  const [genres, setgenres] = useState([])

  const genreforURL=useGenres(selectedGenres);

  const fetchMovies=async()=>{
    const {data}=await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}
    `)

    setcontent(data.results);
    setnumOfPages(data.total_pages);
   // console.log(data);
  

}

  useEffect(() => {
    window.scroll(0,0)
    fetchMovies();
  
   
  }, [page,genreforURL])
  


  return (
    <div>
      
      <span className='pageTitle'>Discover Movies</span>
      <Genres 
      type='movie'
      selectedGenres={selectedGenres}
      setselectedGenres={setselectedGenres}
      genres={genres}
      setgenres={setgenres}
      setpage={setpage}

      />
      <div className='trending'>
        {
          content?.map((c)=>(
            <SingleContent 
            key={c.id} 
            id={c.id} 
            poster={c.poster_path} 
            title={c.title || c.name} 
            date={c.first_air_date || c.release_date}
            media_type='movie'
            vote_average={c.vote_average}
            />
          ))
        }
      </div>
      {numOfPages>1 && (
  <CustomPagination setpage={setpage} numOfPages={numOfPages}  />
      )}
      
    </div>
  )
}

export default Movies