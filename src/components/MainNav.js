import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import MovieIcon from '@material-ui/icons/Movie';
import PersonalVideoIcon from '@material-ui/icons/PersonalVideo';
import SearchIcon from '@material-ui/icons/Search';
import {useNavigate} from "react-router-dom"
const useStyles = makeStyles({
  root: {
    width: "100%",
    position:"fixed",
    bottom:0,
    backgroundColor:"#2d313a",
    zIndex:100,
  },
});

export default function SimpleBottomNavigation() {
  const history=useNavigate();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  
  useEffect(() => {
    if(value===0){
      history('/');
    }else if(value===1){
      history('/movies');
    }else if(value===2){
      history('/series');
    }else{
      history('/search');
    }
  
    
  }, [value,history])
  

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction style={{color:"white"}}
      label="Trending" icon={<WhatshotIcon  />} />


      <BottomNavigationAction style={{color:"white"}} label="Movies" icon={<MovieIcon />} />

      <BottomNavigationAction style={{color:"white"}} label="TV Series" icon={<PersonalVideoIcon />} />

      <BottomNavigationAction style={{color:"white"}} label="Search" icon={<SearchIcon />} />

    </BottomNavigation>
  );
}
