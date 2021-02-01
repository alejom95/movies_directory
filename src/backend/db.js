const axios = require('axios')

const getMovies = () => {
    console.log("entro")
    var config = {
        method: 'get',
        url: 'https://api.themoviedb.org/3/movie/popular?api_key=2c23d517d8fe607f7fd2734062da52ff',
        headers: { 
          'Content-Type': 'application/json'
        }
      };

    const request = axios(config);

    return request
    .then(result => { return result.data; })
    .catch(error => { console.error(error); return Promise.reject(error); });

    
}

const getLatestMovies = () => {
  console.log("entro")
  var config = {
      method: 'get',
      url: 'https://api.themoviedb.org/3/movie/now_playing?api_key=2c23d517d8fe607f7fd2734062da52ff',
      headers: { 
        'Content-Type': 'application/json'
      }
    };

  const request = axios(config);

  return request
  .then(result => { return result.data; })
  .catch(error => { console.error(error); return Promise.reject(error); });

  
}


const getUpcomingMovies = () => {
  console.log("entro")
  var config = {
      method: 'get',
      url: 'https://api.themoviedb.org/3/movie/upcoming?api_key=2c23d517d8fe607f7fd2734062da52ff',
      headers: { 
        'Content-Type': 'application/json'
      }
    };

  const request = axios(config);

  return request
  .then(result => { return result.data; })
  .catch(error => { console.error(error); return Promise.reject(error); });

  
}

const getTopRatedMovies = () => {
  console.log("entro")
  var config = {
      method: 'get',
      url: 'https://api.themoviedb.org/3/movie/top_rated?api_key=2c23d517d8fe607f7fd2734062da52ff',
      headers: { 
        'Content-Type': 'application/json'
      }
    };

  const request = axios(config);

  return request
  .then(result => { return result.data; })
  .catch(error => { console.error(error); return Promise.reject(error); });

  
}




const getMovieById = (body) => {
  var {movie_id} = body;
  
  console.log("entro")
  var config = {
      method: 'get',
      url: 'https://api.themoviedb.org/3/movie/'+movie_id+'?api_key=2c23d517d8fe607f7fd2734062da52ff',
      headers: { 
        'Content-Type': 'application/json'
      }
    };

  const request = axios(config);

  return request
  .then(result => { return result.data; })
  .catch(error => { console.error(error); return Promise.reject(error); });

  
}

module.exports = {
    getMovies,
    getMovieById,
    getLatestMovies,
    getUpcomingMovies,
    getTopRatedMovies
}