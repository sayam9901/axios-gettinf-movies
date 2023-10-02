
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
const dummmtData = [{
  id : 1,
  title : "anything",
  opening_crawl : "this is a movie about the girl who doesnot know anything",
  release_date: " 2020-11-12"
},
{
  id : 2,
  title : "anything",
  opening_crawl : "this is a movie about the girl who doesnot know anything",
  release_date: " 2020-11-12"
}]

function App() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Axios GET request to fetch data from the API
    axios.get('https://swapi.dev/api/films')
      .then((response) => {
        setFilms(response.data.results) 
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  const handleTHeData = () =>{
    setLoading(false)
  }
  return (
    <div className="App">
      <div className='container'>
        <button onClick={handleTHeData}>fetch data</button>
        {loading ? (
         <ul>
         {dummmtData.map((item) => (
           <li key={item.id}>
             <h3>{item.title}</h3>
             <p>{item.opening_crawl}</p>
             <h3>{item.release_date}</h3> {/* Corrected to use `item.release_date` */}
           </li>
         ))}
       </ul>
      ) : (
        <ul>
          {films.map((film) => (
            <li key={film.episode_id}>
              <h2>{film.title}</h2>
              <p>Director: {film.director}</p>
              <p>Release Date: {film.release_date}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
  );
}

export default App;
