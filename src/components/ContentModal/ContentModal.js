import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import axios from 'axios';
import { useState } from 'react';
import { img_500, unavailable, unavailableLandscape } from '../../config/config';
import YouTubeIcon from '@material-ui/icons/YouTube';
import Button from '@material-ui/core/Button';
import './ContentModal.css'
import Carousal from '../Carousel/Carousal'
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width:"90%",
    height:"80%",
    backgroundColor:"#39445a",
    border:"1px solid #282c34",
    borderRadius:10,
    color:"white",
    boxShadow:theme.shadows[5],
    padding:theme.spacing(1,1,3),
   
  },
}));

export default function ContentModal({children,media_type,id}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
    const [content, setcontent] = useState([])
    const [video, setvideo] = useState("");
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData=async()=>{
   const {data}= await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
    setcontent(data);
  }
  const fetchVideo=async()=>{
    const {data}= await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)

     setvideo(data.results[0]?.key);
   }

  

   useEffect(() => {
     fetchData();
    fetchVideo();
   }, [])
   

   
  return (
    <>
      <div  className='media' type="button" onClick={handleOpen}>
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
            {content && (
                <div className={classes.paper}>
            <div className='contentModal'>
                <img
                className='content_portrait' 
                src={content.poster_path?`${img_500}/${content.poster_path}`:unavailable}
                alt={content.name || content.title}
                />
                  <img
                className='content_landscape' 
                src={content.backdrop_path?`${img_500}/${content.backdrop_path}`:unavailableLandscape}
                alt={content.name || content.title}
                />
            <div className='contentmodal_about'>
                <span className='contentmodal_title'>
                    {content.name || content.title}(
                        {(
                            content.first_air_date ||
                            content.release_date ||
                            "-----"
                        ).substring(0,4)}
                    )
                </span>
                {content.tagline && (
                    <i className='tagline'>{content.tagline}</i>
                )}
                <span className='contentmodal_description'>
                    {content.overview}
                </span>
                <div>
                    <Carousal media_type={media_type} id={id}  />
                </div>
                <Button
                variant='contained'
                startIcon={<YouTubeIcon/>}
                color='secondary'
                target='_blank'
                href={`https://www.youtube.com/watchv=${video}`}
                >
                    watch the trailer
                </Button>
            </div>


            </div>
          </div>
            )}
          
        </Fade>
      </Modal>
    </>
  );
}
