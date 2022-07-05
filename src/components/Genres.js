import { Chip } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect } from 'react'

const Genres = ({
    type,
    selectedGenres,
    genres,
    setgenres,
    setpage,
    setselectedGenres
}) => {

const handleAdd=(genre)=>{
    setselectedGenres([...selectedGenres,genre]);
    setgenres(genres.filter((g)=>g.id!==genre.id));
    setpage(1);
}

const handleRemove=(genre)=>{
    setselectedGenres(
        selectedGenres.filter((selected)=>selected.id!==genre.id)
    )
    setgenres([...genres,genre]);
    setpage(1);

}

const fetchGenres=async()=>{
    const {data}=await axios.get(`
        https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US
        `)

    setgenres(data.genres);


    }

    //console.log(genres);
    useEffect(() => {
        fetchGenres();
        return ()=>{
            setgenres({});
        }
    }, [])
    

  return (
    <div
    style={{
        padding:"6px 0",
    }}
    >
        {
            selectedGenres?.map((genre)=>(
                <Chip 
                key={genre.id}
                label={genre.name}  
                style={{margin:2}}
                clickable
                size='small'
                color='primary'
                onDelete={()=>handleRemove(genre)}
                />
            ))
        }
        {
            genres?.map((genre)=>(
                <Chip 
                key={genre.id}
                label={genre.name}  
                style={{margin:2}}
                clickable
                size='small'
                onClick={()=>handleAdd(genre)}
                />
            ))
        }
    </div>
  )
}

export default Genres