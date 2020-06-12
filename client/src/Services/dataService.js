/* @flow */
import axios from 'axios'
import Cookies from 'universal-cookie';





var answer ;
const apiKey = '8d181bcb5e80a929053da01f6921e4a9';
const serverBaseUrl = "https://cwc0sbvgf4.execute-api.eu-west-1.amazonaws.com/"


export default {
  getMovies: (category) => {
    const url = `https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}&language=en-US&page=1`
    return axios.get(url).then(info => info.data)
  }, 
  getMovies2: (category) => {
    const url = `https://cwc0sbvgf4.execute-api.eu-west-1.amazonaws.com/dev/items`
    return axios.get(url).then(info => info.data)
  },
  getSearch: (query ) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}`
    return axios.get(url).then(info => info.data)
  },
  getSearch2: (query ) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}`
    return axios.get(url).then(info => info.data)
  },
  getMovieById: (movieId ) => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=videos`
    return axios.get(url).then(info => info.data)
  },
  getMostVoted: () => {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=vote_average.asc&include_adult=true&include_video=false&page=1`
    return axios.get(url).then(info => info.data)
  },

  addFilm: (title , description, datec , genre)=> {
    const url = serverBaseUrl + "dev/items "
    axios.post(url, {
      name: title,
      descript : description ,
      dateCreation: datec,
      Genre : genre,

      withCredentials: true ,
      headers: { 'Access-Control-Allow-Origin': '*',}
    }).then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error + " ERROR");
    });
  },

  getFilmList : (ss) => {
    const url = serverBaseUrl + "dev/items"
    var infos;
    axios.get(url).then((info) => {console.log(info); infos = info},(error) => {console.log(error + " ERROR");});
    return axios.get(url).then(info => info.data)
  },

  getMovieById2: (movieId ) => {
    const url = serverBaseUrl+ "dev/items/"+String(movieId)
    return axios.get(url).then(info => info.data)
  },

  addUser : (username) =>{
    const url = serverBaseUrl + "dev/User/"
    axios.post(url, {
      User: username,
      withCredentials: true ,
      headers: { 'Access-Control-Allow-Origin': '*',}
    }).then(info => {
    console.log(username)
    console.log(info)
    const cookies = new Cookies();
    cookies.set('loginRes', JSON.stringify(info.data), { path: '/' });

  },)
  },
  getUser : (username) =>{
    const url = serverBaseUrl + "dev/User/getUser"
    axios.post(url, {
      User: username,
      withCredentials: true ,
      headers: { 'Access-Control-Allow-Origin': '*',}
    }).then(info => {
    console.log(username)
    console.log(info)
    const cookies = new Cookies();
    cookies.set('LoggedIn', JSON.stringify(info.data), { path: '/' });
    cookies.set('loginRes', JSON.stringify(info.data), { path: '/' });
  })
  },
  sendNote : (username, note, film) =>{
    const url = serverBaseUrl + "dev/Note/SendNote"
    axios.post(url, {
      User: username,
      Note : note,
      Film : film,
      withCredentials: true ,
      headers: { 'Access-Control-Allow-Origin': '*',}
    }).then(info => {
      console.log(username)
      console.log(note)
      console.log(film)
      const cookies = new Cookies();
      cookies.set('ResultRequete', JSON.stringify(info.data), { path: '/' });
    })
}
 


}

