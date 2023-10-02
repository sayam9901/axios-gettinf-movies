
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
  const [retrying, setRetrying] = useState(false);
  const [retryInterval, setRetryInterval] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://swapi.dev/api/films');
      setFilms(response.data.results);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      retryFetch();
    }
  };

  const retryFetch = () => {
    setLoading(true);
    setRetrying(true);
    setRetryInterval(setInterval(fetchData, 5000));
  };

  const cancelRetry = () => {
    setLoading(false);
    setRetrying(false);
    clearInterval(retryInterval); 
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="App">
      <div className='container'>
      <button onClick={retrying ? cancelRetry : retryFetch}>
          {retrying ? 'Cancel Retry' : 'Retry fetching data'}
        </button>
        {loading ? (
          <ul>
            <li>
              <h3>{retrying ? 'Retrying...' : 'Loading...'}</h3>
            </li>
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
