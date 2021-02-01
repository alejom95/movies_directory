import React from 'react'
import logo from './logo.svg';
import './App.css';
import Carousel from 'react-material-ui-carousel';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { ModalContent, ModalFooter, ModalButton, useDialog } from 'react-st-modal';
import { CustomDialog} from 'react-st-modal';
import ReactStars from "react-rating-stars-component";

const useStyles = makeStyles({
  root: {
    width: 345,
    minHeight:350
  },
  media: {
    height: 220,
    width:'100%'
  },
});


function CustomDialogContent(props) {
  // use this hook to control the dialog
  console.log("propsDialog",props);

  var [movie,setMovie] = React.useState({});
  const dialog = useDialog();
  var result =""
  var genres = "";
  const [value, setValue] = React.useState();

  React.useEffect(() => {
    const getInfoMovie = async () => {
      result = await axios.post('http://192.168.1.51:3001/getMovieId', {
       "movie_id":props.id
     });
 
     setMovie(result.data);
     
   }
 
   getInfoMovie();

  },[])
  
  for(var i in movie.genres){
    genres += " - "+movie.genres[i].name;
  }

  if(movie === {}){
    return "";
  }else{
    return (
      <div>
        <ModalContent>
            <div style={{fontSize:'large'}}>{movie.tagline}</div>
            <div style={{display:'flex'}}>{genres}</div>
            <div>
            <img src={"https://image.tmdb.org/t/p/w500/"+movie.backdrop_path}/>
            </div>
            <div>
            <label>
              {movie.overview}
            </label>
            </div>
            <div>
            
            </div>
          </ModalContent>
          <ModalFooter>
            <ModalButton
              onClick={() => {
                dialog.close(value);
              }}
            >
              OK
            </ModalButton>
          </ModalFooter>
        </div>
    );
  }

  
}


function Item(props)
{
    const classes = useStyles();
    return (
      <>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={"https://image.tmdb.org/t/p/w500/"+props.item.backdrop_path}
                title="Contemplative Reptile"
              />
              <CardContent style={{backgroundColor:'#e4e5e6'}}>
                <Typography gutterBottom variant="h5" component="h2">
                  {props.item.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {"Release date: "+props.item.release_date}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions style={{justifyContent:'center'}}>
              <Button size="small" color="primary" onClick={ () => {
                  const result = CustomDialog(
                    <CustomDialogContent  id={props.item.id}/>,
                    {
                      title: props.item.title,
                      showCloseIcon: true,
                    }
                  );
                }}>
                Learn More
              </Button>
            </CardActions>
          </Card> 
       </>   
    )
}

function App() {
  const [elements, setElements] = React.useState([]);
  const [elementsLatest, setElementsLatest] = React.useState([]);
  const [elementsUpcoming, setElementsUpcoming] = React.useState([]);
  const [elementsTopRated, setElementsTopRated] = React.useState([]);

  React.useEffect(() => {
    const getMovies = async () => {
      const result = await axios(
        'http://192.168.1.51:3001/getMovies',
      );


      let datos = result.data;
      let movies = datos.results;
      var i,j,temparray,chunk = 5;
      for (i=0,j=movies.length; i<j; i+=chunk) {
        temparray = movies.slice(i,i+chunk);
        

        setElements(elements => [...elements,{movies:temparray}])
      }

    }

    const getLatestMovies = async () => {
      const result2 = await axios(
        'http://192.168.1.51:3001/getLatestMovies',
      );
        console.log("result2",result2.data);

      let datos = result2.data;
      let movies = datos.results;
      var i,j,temparray,chunk = 5;
      for (i=0,j=movies.length; i<j; i+=chunk) {
        temparray = movies.slice(i,i+chunk);
        

        setElementsLatest(elementsLatest => [...elementsLatest,{movies:temparray}])

      }
 
    }

    const getUpcomingMovies = async () => {
      const result3 = await axios(
        'http://192.168.1.51:3001/getUpcomingMovies',
      );
        console.log("result3",result3.data);

      let datos = result3.data;
      let movies = datos.results;
      var i,j,temparray,chunk = 5;
      for (i=0,j=movies.length; i<j; i+=chunk) {
        temparray = movies.slice(i,i+chunk);
        

        setElementsUpcoming(elementsUpcoming => [...elementsUpcoming,{movies:temparray}])

      }

    }

    const getTopRatedMovies = async () => {
      const result4 = await axios(
        'http://192.168.1.51:3001/getTopRatedMovies',
      );
        console.log("result4",result4.data);

      let datos = result4.data;
      let movies = datos.results;
      var i,j,temparray,chunk = 5;
      for (i=0,j=movies.length; i<j; i+=chunk) {
        temparray = movies.slice(i,i+chunk);
        

        setElementsTopRated(elementsTopRated => [...elementsTopRated,{movies:temparray}])

      }
   
    }

    getTopRatedMovies();
    getUpcomingMovies();
    getLatestMovies();

    getMovies();

  },[])

  var items = [
      {
          name: "Random Name #1",
          description: "Probably the most random thing you have ever seen!"
      },
      {
          name: "Random Name #2",
          description: "Hello World!"
      }

  ]

  return (
    
    <div className="App">
      <header className="App-header">
        <img src={"https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"} className="App-logo" alt="logo" />
        <p>
          The Movie Database
        </p>
      </header>
        <div>
        <Typography className="App-titles" variant='h4'>
                  Popular Movies
        </Typography>
        
        <Carousel className="App-carrusel">
            {

              elements.map( (item,i) => {return(
                <div>
                  <Grid item md={12} sm={12} xs={12}>   
                  <Grid style={{display:'flex'}}>
                    {
                      item.movies.map((movie,j) => (
                        (<Grid item md={3} sm={12} xs={12}>
                          <Item key={movie.id} item={movie}/> 

                        </Grid>)
                      ))
                    }
                  </Grid>
                </Grid>
                </div>
                
              )})
            }
        </Carousel>
        </div>
        <div>
        <Typography className="App-titles" variant='h4'>
                  Now Playing Movies
        </Typography>
        <Carousel className="App-carrusel">
            {

              elementsLatest.map( (item,i) => {return(
                <div>
                  <Grid item md={12} sm={12} xs={12}>   
                  <Grid style={{display:'flex'}}>
                    {
                      item.movies.map((movie,j) => (
                        (<Grid item md={3} sm={12} xs={12}>
                          <Item key={movie.id} item={movie}/> 

                        </Grid>)
                      ))
                    }
                  </Grid>
                </Grid>
                </div>
                
              )})
            }
        </Carousel>
        </div>
        <div>
        <Typography className="App-titles" variant='h4'>
                  Upcoming Movies
        </Typography>
        <Carousel className="App-carrusel">
            {

              elementsUpcoming.map( (item,i) => {return(
                <div>
                  <Grid item md={12} sm={12} xs={12}>   
                  <Grid style={{display:'flex'}}>
                    {
                      item.movies.map((movie,j) => (
                        (<Grid item md={3} sm={12} xs={12}>
                          <Item key={movie.id} item={movie}/> 

                        </Grid>)
                      ))
                    }
                  </Grid>
                </Grid>
                </div>
                
              )})
            }
        </Carousel>
        </div>
        <div>
        <Typography className="App-titles" variant='h4'>
                  Top Rated Movies
        </Typography>
        <Carousel className="App-carrusel">
            {

              elementsTopRated.map( (item,i) => {return(
                <div>
                  <Grid item md={12} sm={12} xs={12}>   
                  <Grid style={{display:'flex'}}>
                    {
                      item.movies.map((movie,j) => (
                        (<Grid item md={3} sm={12} xs={12}>
                          <Item key={movie.id} item={movie}/> 

                        </Grid>)
                      ))
                    }
                  </Grid>
                </Grid>
                </div>
                
              )})
            }
        </Carousel>
        </div>
      
    </div>
    
  );
}

export default App;
